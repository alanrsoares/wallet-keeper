import {
  EyeIcon,
  EyeSlashIcon,
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

const WalletDetails = (props: Props) => {
  const walletKeeper = useWalletKeeper();
  const {
    mutateAsync: unlockWallet,
    isLoading: isUnlocking,
    error: unlockError,
  } = walletKeeper.mutations.unlockWallet();
  const { data: balance } = walletKeeper.queries.getBalance({
    address: props.address,
  });

  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const account = walletKeeper.state.accountsByAddress[props.address];

  const handleUnlock = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const wallet = await unlockWallet({
        address,
        password,
        onProgress: setProgress,
      });

      setPrivateKey(wallet.privateKey);
    },
    [props.address, password]
  );

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
          <CopyToClipboard className="flex badge font-mono" content={address}>
            {maskAddress(address)}
          </CopyToClipboard>
        </div>

        <Button onClick={() => setIsExpanded(!isExpanded)} length="wide">
          {isExpanded ? (
            <>
              <EyeSlashIcon className="h-5 w-5 mr-2" /> Hide
            </>
          ) : (
            <>
              <EyeIcon className="h-5 w-5 mr-2" /> Show
            </>
          )}{" "}
          private key
        </Button>
      </div>
      {isExpanded && (
        <form onSubmit={handleUnlock} className="grid gap-4">
          {Boolean(unlockError) && (
            <Alert variant="error">
              <span className="font-bold">Error:</span>
              {(unlockError as Error).message}
            </Alert>
          )}

          {privateKey ? (
            <Alert variant="success">
              <span className="font-bold">Private Key:</span>
              <CopyToClipboard className="text-sm">
                {privateKey}
              </CopyToClipboard>
            </Alert>
          ) : (
            <>
              <Field
                name="password"
                label="Wallet Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                disabled={password.length < 3}
                loading={isUnlocking}
                progress={progress}
              >
                {isUnlocking ? (
                  "Unlocking..."
                ) : (
                  <>
                    <LockClosedIcon className="h-5 w-5 mr-2" /> Unlock
                  </>
                )}
              </Button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default WalletDetails;
