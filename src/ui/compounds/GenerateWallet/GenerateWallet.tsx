import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { Maybe } from "~/lib/monads";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import Card from "~/ui/components/Card";
import Field from "~/ui/components/Field";

export type Props = {
  className?: string;
};

const GenerateWallet: FC<Props> = (props) => {
  const walletKeeper = useWalletKeeper();

  // form meta state:
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [progress, setProgress] = useState(0);

  // form fields:
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const fields = [displayName, password, passwordConfirm];

  useEffect(() => {
    if (!isDirty && fields.some(Boolean)) {
      setIsDirty(true);
    }
  }, [isDirty, fields]);

  const {
    mutateAsync: generateWalletAsync,
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

      try {
        await generateWalletAsync({
          displayName,
          password,
          onProgress: setProgress,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.warn({
            message: "Failed to generate wallet",
          });
        }
      }
    },
    [displayName, password]
  );

  const validationError = useMemo(() => {
    if (!isDirty) {
      return null;
    }

    if (!displayName) {
      return { message: "Display name is required", field: "displayName" };
    }

    if (displayName.length < 3) {
      return { message: "Display name is too short", field: "displayName" };
    }

    if (displayName.length > 32) {
      return { message: "Display name is too long", field: "displayName" };
    }

    if (!password) {
      return { message: "Password is required", field: "password" };
    }

    if (password && password.length < 8) {
      return { message: "Password is too short", field: "password" };
    }

    if (password !== passwordConfirm) {
      return { message: "Passwords do not match", field: "passwordConfirm" };
    }

    return null;
  }, [displayName, password, passwordConfirm, isDirty]);

  const isValid = !validationError && isDirty;

  if (!isExpanded) {
    return (
      <Button
        data-testid="generate-wallet-button-collapsed"
        variant="primary"
        onClick={() => {
          setIsExpanded(true);
          // scroll to element:
          setTimeout(() => {
            Maybe.of(
              document.querySelector("[data-testid=generate-wallet-card]")
            ).map((element) => {
              if ("scrollIntoView" in element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            });
          }, 16);
        }}
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Generate new wallet
      </Button>
    );
  }

  return (
    <Card
      className={clsx("card-compact bg-base-300 relative", props.className)}
      testId="generate-wallet-card"
    >
      <Button
        shape="circle"
        size="sm"
        className="absolute top-4 right-4"
        aria-label="Close"
        onClick={handleReset}
      >
        <XMarkIcon className="h-4 w-4" />
      </Button>
      <form className="grid gap-4" onSubmit={handleSubmit}>
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
    </Card>
  );
};

export default GenerateWallet;
