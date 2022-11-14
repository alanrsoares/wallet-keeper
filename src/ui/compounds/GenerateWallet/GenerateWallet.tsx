import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, useCallback, useMemo, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import Field from "~/ui/components/Field";

type Props = {
  className?: string;
};

const GenerateWallet: FC<Props> = (props) => {
  const walletKeeper = useWalletKeeper();

  const defaultExpanded = useMemo(() => {
    return !Object.keys(walletKeeper.state.accountsByAddress).length;
  }, [walletKeeper.state.accountsByAddress]);

  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [progress, setProgress] = useState(0);

  const {
    mutateAsync: createWallet,
    isLoading,
    error,
  } = walletKeeper.mutations.createWallet();

  const handleReset = useCallback(() => {
    setDisplayName("");
    setPassword("");
    setPasswordConfirm("");
    setProgress(0);
    setIsExpanded(false);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await createWallet({
        displayName,
        password,
        onProgress: setProgress,
      });
    },
    []
  );

  const validationError = useMemo(() => {
    if (displayName.length === 0) {
      return { message: "Display name is required", field: "displayName" };
    }

    if (displayName.length < 3) {
      return { message: "Display name is too short", field: "displayName" };
    }

    if (displayName.length > 32) {
      return { message: "Display name is too long", field: "displayName" };
    }

    if (password !== passwordConfirm) {
      return { message: "Passwords do not match", field: "passwordConfirm" };
    }

    if (password.length < 8) {
      return { message: "Password is too short", field: "password" };
    }

    return null;
  }, [displayName, password, passwordConfirm]);

  const isValid = !validationError;

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        data-testid="generate-wallet-button-collapsed"
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Generate new wallet
      </Button>
    );
  }

  return (
    <section className={clsx("card bg-base-300 relative", props.className)}>
      <Button
        shape="circle"
        size="sm"
        className="absolute top-4 right-4"
        onClick={handleReset}
      >
        <XMarkIcon className="h-4 w-4" />
      </Button>
      <form className="grid gap-4 card-body" onSubmit={handleSubmit}>
        {Boolean(error) && (
          <Alert variant="error">
            <span className="font-bold">Error:</span>
            {(error as Error).message}
          </Alert>
        )}
        <h2 className="card-title">Generate new wallet</h2>
        <Field
          label="Display Name"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          validation={
            validationError?.field === "displayName"
              ? {
                  message: validationError.message,
                  status: "error",
                }
              : undefined
          }
        />
        <Field
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          validation={
            validationError?.field === "password"
              ? {
                  message: validationError.message,
                  status: "error",
                }
              : undefined
          }
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          validation={
            validationError?.field === "passwordConfirm"
              ? {
                  message: validationError.message,
                  status: "error",
                }
              : undefined
          }
        />
        <Button
          data-testid="generate-wallet-button-expanded"
          variant="primary"
          disabled={!isValid}
          loading={isLoading}
          progress={progress}
          type="submit"
        >
          {isLoading ? "Generating wallet..." : "Generate new wallet"}
        </Button>
      </form>
    </section>
  );
};

export default GenerateWallet;
