import { PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, useCallback, useMemo, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import Input from "~/ui/components/Input";

const Field: FC<{
  label?: string;
  type?: "text" | "password";
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  return (
    <div className="">
      <label className="grid gap-2">
        <span className="opacity-80">{props.label}</span>
        <Input
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.label}
          onChange={props.onChange}
        />
      </label>
    </div>
  );
};

type Props = {
  className?: string;
};

const GenerateWallet = (props: Props) => {
  const walletKeeper = useWalletKeeper();
  const [isExpanded, setIsExpanded] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [progress, setProgress] = useState(0);

  const {
    mutate: createWallet,
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
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      createWallet({
        displayName: formData.get("displayName") as string,
        password: formData.get("password") as string,
        onProgress: setProgress,
      });
    },
    []
  );

  const validationMessage = useMemo(() => {
    if (displayName.length === 0) {
      return "Display name is required";
    }

    if (displayName.length < 3) {
      return "Display name must be at least 3 characters";
    }

    if (displayName.length > 32) {
      return "Display name is too long";
    }

    if (password !== passwordConfirm) {
      return "Passwords do not match";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    return null;
  }, [password, passwordConfirm]);

  const isValid = !validationMessage;

  if (!isExpanded) {
    return (
      <Button onClick={() => setIsExpanded(true)}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Generate new wallet
      </Button>
    );
  }

  const formattedProgress = progress.toLocaleString(undefined, {
    style: "percent",
  });

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
          <Alert variant="error">Error! {(error as Error).message}</Alert>
        )}
        <h2>Generate new wallet</h2>
        <Field
          label="Display Name"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button
          variant="primary"
          disabled={!isValid}
          loading={isLoading}
          progress={progress}
          type="submit"
        >
          {isLoading ? "Generating wallet..." : "Generate wallet"}
        </Button>
      </form>
    </section>
  );
};

export default GenerateWallet;
