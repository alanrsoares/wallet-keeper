import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { Maybe } from "~/lib/monads";
import { createTestIds } from "~/lib/test-utils";
import { Alert, Button, Card, Field } from "~/ui/components";

const SCHEMA = z
  .object({
    password: z.string().min(8, "Password is too short"),
    passwordConfirm: z.string().min(8, "Password is too short"),
    displayName: z
      .string()
      .min(3, "Display name is too short")
      .max(32, "Display name is too long"),
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

const GenerateWallet: FC<Props> = (props) => {
  const walletKeeper = useWalletKeeper();

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
      displayName: "",
    },
    resolver: zodResolver(SCHEMA),
    mode: "all",
  });

  // form meta state:
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    mutateAsync: generateWalletAsync,
    isLoading,
    error,
  } = walletKeeper.mutations.generateWallet();

  const handleReset = useCallback(() => {
    setProgress(0);
    setIsExpanded(false);
    reset();
  }, []);

  const submitHandler = useCallback<SubmitHandler<FormState>>(
    async ({ displayName, password }) => {
      try {
        await generateWalletAsync({
          displayName,
          password,
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
        data-testid={TEST_IDS.generateWalletButton}
        variant="primary"
        responsive={true}
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
      testId={TEST_IDS.generateWalletCard}
      as="section"
    >
      <Card.Body>
        <Button
          shape="circle"
          size="sm"
          className="absolute top-4 right-4"
          aria-label="Close"
          onClick={handleReset}
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
        <form className="grid gap-4" onSubmit={handleSubmit(submitHandler)}>
          {Boolean(error) && (
            <Alert variant="error">
              <span className="font-bold">Error:</span>
              {(error as Error).message}
            </Alert>
          )}
          <h2 className="card-title">Generate new wallet</h2>
          <Field
            label="Display Name"
            {...register("displayName")}
            validation={
              formState.errors.displayName?.message
                ? {
                    status: "error",
                    message: formState.errors.displayName.message,
                  }
                : undefined
            }
            testId={TEST_IDS.displayNameInput}
          />
          {formState.errors?.displayName?.message && (
            <p>{formState.errors?.displayName.message}</p>
          )}
          <Field
            label="Password"
            type="password"
            {...register("password")}
            validation={
              formState.errors.password?.message
                ? {
                    status: "error",
                    message: formState.errors.password.message,
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
                    status: "error",
                    message: formState.errors.passwordConfirm.message,
                  }
                : undefined
            }
            testId={TEST_IDS.passwordConfirmInput}
          />
          <Button
            responsive={true}
            testId={TEST_IDS.submitButton}
            variant="primary"
            disabled={!formState.isValid}
            loading={isLoading || formState.isSubmitting}
            progress={progress}
            type="submit"
          >
            {isLoading ? "Generating wallet..." : "Generate new wallet"}
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default GenerateWallet;

export const TEST_IDS = createTestIds("GenerateWallet", [
  "displayNameInput",
  "passwordInput",
  "passwordConfirmInput",
  "submitButton",
  "generateWalletButton",
  "generateWalletCard",
]);
