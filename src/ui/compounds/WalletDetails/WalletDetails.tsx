import {
  DocumentDuplicateIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { maskAddress } from "~/lib/utils";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import CopyToClipboard from "~/ui/components/CopyToClipboard";
import Field from "~/ui/components/Field";
import Identicon from "~/ui/components/Identicon";
import Tooltip from "~/ui/components/Tooltip";

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
        <div className="grid gap-4">
          <div className="flex gap-4 items-center">
            <Identicon address={address} diameter={48} />
            <div className="grid gap-1">
              <span className="font-semibold font-mono">{displayName}</span>
              <Tooltip
                tip="ETH balance"
                className="font-mono text-sm text-left"
              >
                {balance ?? "..."} ETH
              </Tooltip>
            </div>
          </div>
          <CopyToClipboard className="flex badge font-mono">
            {maskAddress(address)}
          </CopyToClipboard>
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
