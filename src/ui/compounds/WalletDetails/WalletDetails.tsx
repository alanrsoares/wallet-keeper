import {
  DocumentDuplicateIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import CopyToClipboard from "~/ui/components/CopyToClipboard";
import Field from "~/ui/components/Field";
import Identicon from "~/ui/components/Identicon";

type Props = {
  address: string;
};

type WalletAction = "VIEW_PRIVATE_KEY" | "VIEW_QR_CODE" | "COPY_ADDRESS";

const WalletDetails = (props: Props) => {
  const walletKeeper = useWalletKeeper();
  const {
    mutateAsync: unlockWallet,
    isLoading,
    error,
  } = walletKeeper.mutations.unlockWallet();

  const { data: balance } = walletKeeper.queries.getBalance({
    address: props.address,
    network: "goerli",
  });

  const [progress, setProgress] = useState(0);

  const [action, setAction] = useState<WalletAction | null>(null);
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const account = walletKeeper.state.accountsByAddress[props.address];

  const handleUnlock = useCallback(async () => {
    const wallet = await unlockWallet({
      address,
      password,
      onProgress: setProgress,
    });

    setPrivateKey(wallet.privateKey);
  }, [props.address, password]);

  if (!account) {
    return <div>Wallet not found: {props.address}</div>;
  }

  const { displayName, address } = account;

  return (
    <div className="card-body">
      <div className="card-title grid md:flex justify-between items-center">
        <div className="flex gap-4 items-center bg-base-300 p-2 px-4 rounded-full">
          <Identicon address={address} diameter={36} />
          <div className="grid">
            <span className="font-semibold font-mono pl-2">{displayName}</span>
            <div>
              <CopyToClipboard className="flex badge font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </CopyToClipboard>
            </div>
            <div className="badge font-mono">{balance} ETH</div>
          </div>
        </div>
        <Button onClick={setAction.bind(null, "VIEW_PRIVATE_KEY")}>
          <EyeIcon className="h-5 w-5 mr-2" />
          View private key
        </Button>
      </div>
      {action === "VIEW_PRIVATE_KEY" && (
        <>
          <div className="">
            <Field
              name="password"
              label="Wallet Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {privateKey ? (
            <Alert variant="success">
              <CopyToClipboard>{privateKey}</CopyToClipboard>
            </Alert>
          ) : (
            <div className="card-actions">
              <Button
                disabled={password.length < 3}
                onClick={handleUnlock}
                loading={isLoading}
                progress={progress}
                length="block"
              >
                {isLoading ? (
                  "Unlocking..."
                ) : (
                  <>
                    <LockClosedIcon className="h-5 w-5 mr-2" /> Unlock
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WalletDetails;
