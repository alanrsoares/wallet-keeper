import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import CopyToClipboard from "~/ui/components/CopyToClipboard";
import Field from "~/ui/components/Field";

export type Props = {
  address: string;
};

const ExportWalletForm = ({ address }: Props) => {
  const { mutations } = useWalletKeeper();

  const {
    mutateAsync: unlockWalletAsync,
    isLoading: isUnlocking,
    error: unlockError,
  } = mutations.unlockWallet();

  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

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

  return (
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
  );
};

export default ExportWalletForm;
