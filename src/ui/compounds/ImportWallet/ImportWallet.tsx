import { ArrowDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { Maybe } from "~/lib/monads";
import { createTestIds } from "~/lib/test-utils";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import Card from "~/ui/components/Card";
import Field from "~/ui/components/Field";

const SCHEMA = z
  .object({
    displayName: z
      .string()
      .min(3, "Display name is too short")
      .max(32, "Display name is too long"),
    privateKey: z.string().min(64, "Private key is too short"),
    password: z.string().min(8, "Password is too short"),
    passwordConfirm: z.string().min(8, "Password is too short"),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

export type FormState = z.infer<typeof SCHEMA>;

export type Props = {
  className?: string;
};

const ImportWallet: FC<Props> = (props) => {
  const { mutations } = useWalletKeeper();

  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, formState, reset } = useForm<FormState>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
      displayName: "",
    },
    resolver: zodResolver(SCHEMA),
    mode: "all",
  });

  const {
    mutateAsync: importWalletAsync,
    isLoading,
    error,
  } = mutations.importWallet();

  const handleReset = useCallback(() => {
    setProgress(0);
    setIsExpanded(false);
    reset();
  }, []);

  const submitHandler = useCallback<SubmitHandler<FormState>>(
    async ({ displayName, privateKey, password }) => {
      try {
        await importWalletAsync({
          displayName,
          password,
          privateKey,
          onProgress: setProgress,
        });

        handleReset();
      } catch (error) {
        console.warn({
          message: "Failed to generate wallet",
        });
      }
    },
    []
  );

  if (!isExpanded) {
    return (
      <Button
        data-testid={TEST_IDS.importWalletButton}
        variant="secondary"
        responsive={true}
        onClick={() => {
          setIsExpanded(true);
          // scroll to element:
          setTimeout(() => {
            const element = document.querySelector(
              "[data-testid=import-wallet-card]"
            );

            Maybe.of(
              document.querySelector("[data-testid=import-wallet-card]")
            ).map((element) => {
              element.scrollIntoView({ behavior: "smooth" });
            });
          }, 16);
        }}
      >
        <ArrowDownIcon className="w-4 h-4 mr-2" />
        Import existing wallet
      </Button>
    );
  }

  return (
    <Card
      className={clsx("card-compact bg-base-300 relative", props.className)}
      testId="import-wallet-card"
      as="section"
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
      <form
        className="grid gap-4"
        onSubmit={handleSubmit(submitHandler)}
        data-testid={TEST_IDS.form}
      >
        {Boolean(error) && (
          <Alert variant="error">
            <span className="font-bold">Error:</span>
            {(error as Error).message}
          </Alert>
        )}
        <h2 className="card-title">Import wallet</h2>
        <Field
          label="Display Name"
          {...register("displayName")}
          validation={
            formState.errors.displayName?.message
              ? {
                  message: formState.errors.displayName.message,
                  status: "error",
                }
              : undefined
          }
          testId={TEST_IDS.displayNameInput}
        />
        <Field
          label="Private Key"
          type="password"
          {...register("privateKey")}
          validation={
            formState.errors.privateKey?.message
              ? {
                  message: formState.errors.privateKey.message,
                  status: "error",
                }
              : undefined
          }
          testId={TEST_IDS.privateKeyInput}
        />
        <Field
          label="Password"
          type="password"
          {...register("password")}
          validation={
            formState.errors.password?.message
              ? {
                  message: formState.errors.password.message,
                  status: "error",
                }
              : undefined
          }
          testId={TEST_IDS.passwordInput}
        />
        <Field
          label="Confirm Password"
          type="password"
          {...register("passwordConfirm")}
          validation={
            formState.errors.passwordConfirm?.message
              ? {
                  message: formState.errors.passwordConfirm.message,
                  status: "error",
                }
              : undefined
          }
          testId={TEST_IDS.passwordConfirmInput}
        />
        <Button
          testId={TEST_IDS.submitButton}
          variant="secondary"
          responsive={true}
          disabled={!formState.isValid}
          loading={isLoading}
          progress={progress}
          type="submit"
        >
          {isLoading ? "Importing wallet..." : "Import existing wallet"}
        </Button>
      </form>
    </Card>
  );
};

export default ImportWallet;

export const TEST_IDS = createTestIds("ImportWallet", [
  "form",
  "importWalletButton",
  "displayNameInput",
  "submitButton",
  "privateKeyInput",
  "passwordInput",
  "passwordConfirmInput",
]);
