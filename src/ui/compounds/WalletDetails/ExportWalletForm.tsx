import { LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useCallback, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { createTestIds } from "~/lib/test-utils";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import CopyToClipboard from "~/ui/components/CopyToClipboard";
import Field from "~/ui/components/Field";

type TabKind = "privateKey" | "mnemonic";

type Tab = {
  value: TabKind;
  label: string;
};

const TABS: Tab[] = [
  {
    label: "Private Key",
    value: "privateKey",
  },
  {
    label: "Mnemonic",
    value: "mnemonic",
  },
];

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
  const [mnemonic, setMnemonic] = useState("");
  const [tab, setTab] = useState<TabKind>("privateKey");
  const [privateKey, setPrivateKey] = useState("");

  const [password, setPassword] = useState("");

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
        setMnemonic(wallet.mnemonic?.phrase ?? "");
      } catch (error) {
        console.warn({
          message: "Failed to unlock wallet",
          cause: error,
        });
      }
    },
    [address, password]
  );

  return (
    <form
      onSubmit={handleUnlock}
      className="grid gap-4"
      data-testid={TEST_IDS.form}
    >
      {Boolean(unlockError) && (
        <Alert variant="error" prefix="Error:" testId={TEST_IDS.errorAlert}>
          {(unlockError as Error).message}
        </Alert>
      )}
      {privateKey || mnemonic ? (
        <>
          {privateKey && mnemonic && (
            <div className="tabs tabs-boxed">
              {TABS.map(({ label, value }) => (
                <button
                  className={clsx("tab", {
                    "tab-active": tab === value,
                  })}
                  key={value}
                  onClick={() => setTab(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <Alert
            variant="success"
            prefix={tab === "privateKey" ? "Private key:" : "Mnemonic phrase:"}
            testId={TEST_IDS.resultAlert}
          >
            <CopyToClipboard
              className="overflow-x-clip text-sm max-w-[60vw] md:max-w-xs"
              checkmarkClassname="text-green-900 lg:text-success md:-right-10"
            >
              {tab === "privateKey" ? privateKey : mnemonic}
            </CopyToClipboard>
          </Alert>
        </>
      ) : (
        <>
          <Field
            name="password"
            label="Wallet Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid={TEST_IDS.formPasswordInput}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={password.length < 3}
            loading={isUnlocking}
            progress={progress}
            data-testid={TEST_IDS.formSubmitButton}
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

export const TEST_IDS = createTestIds("ExportWalletForm", [
  "form",
  "formPasswordInput",
  "formSubmitButton",
  "resultAlert",
  "errorAlert",
]);
