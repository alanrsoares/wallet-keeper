import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { maskAddress } from "~/lib/utils";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import Card from "~/ui/components/Card";
import CopyToClipboard from "~/ui/components/CopyToClipboard";
import Field from "~/ui/components/Field";
import Identicon from "~/ui/components/Identicon";
import Tooltip from "~/ui/components/Tooltip";

export type Props = {
  address: string;
};

const WalletDetails = ({ address }: Props) => {
  const { state, mutations, queries } = useWalletKeeper();
  const {
    mutateAsync: unlockWalletAsync,
    isLoading: isUnlocking,
    error: unlockError,
  } = mutations.unlockWallet();

  const { data: balance } = queries.getBalance({ address });

  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const account = state.accountsByAddress[address];

  const handleUnlock = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const wallet = await unlockWalletAsync({
          address,
          password,
          onProgress: setProgress,
        });

        setPrivateKey(wallet.privateKey);
      } catch (error) {
        if (error instanceof Error) {
          console.warn({
            message: "Failed to unlock wallet",
          });
        }
      }
    },
    [address, password]
  );

  if (!account) {
    return (
      <Alert variant="error" prefix="Wallet not found:">
        {address}
      </Alert>
    );
  }

  return (
    <Card>
      <div className="card-title flex-col items-start md:flex-row justify-between">
        <div className="grid gap-4">
          <div className="flex gap-4 items-center">
            <div className="ring ring-black/20 rounded-full h-12 w-12 shadow-md">
              <Identicon address={address} diameter={48} />
            </div>
            <div className="grid gap-1">
              <span className="font-semibold font-mono">
                {account.displayName}
              </span>
              <Tooltip
                tip="ETH balance"
                className="font-mono text-sm text-left whitespace-nowrap"
              >
                <span className="whitespace-nowrap">
                  {balance ?? "..."} ETH
                </span>
              </Tooltip>
            </div>
          </div>
          <CopyToClipboard
            className="flex badge font-mono hover:scale-125 hover:shadow-md transition-all"
            checkmarkClassname="top-0"
            content={address}
          >
            {maskAddress(address)}
          </CopyToClipboard>
        </div>
        <div className="w-full grid gap-2 md:place-items-end md:justify-end-end">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full md:w-auto"
            size="sm"
          >
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
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full md:w-auto"
            variant="danger"
            size="sm"
          >
            <TrashIcon className="h-5 w-5 mr-2" /> Remove wallet
          </Button>
        </div>
      </div>
      {isExpanded && (
        <form onSubmit={handleUnlock} className="grid gap-4">
          {Boolean(unlockError) && (
            <Alert variant="error" prefix="Error:">
              {(unlockError as Error).message}
            </Alert>
          )}
          {privateKey ? (
            <Alert variant="success" prefix="Private key:">
              <CopyToClipboard
                className="overflow-x-clip text-sm max-w-[60vw] md:max-w-sm"
                checkmarkClassname="text-green-900 lg:text-success md:-right-10"
              >
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
                variant="primary"
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
    </Card>
  );
};

export default WalletDetails;
