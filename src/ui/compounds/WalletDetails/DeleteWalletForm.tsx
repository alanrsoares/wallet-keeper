import { TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { createTestIds } from "~/lib/test-utils";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import Field from "~/ui/components/Field";

export type Props = {
  address: string;
};

const DeleteWalletForm = ({ address }: Props) => {
  const { mutations } = useWalletKeeper();

  const {
    mutateAsync: deleteWalletAsync,
    isLoading: isDeleting,
    error: deleteError,
  } = mutations.deleteWallet();

  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");

  const handleDelete = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await deleteWalletAsync({
          address,
          password,
          onProgress: setProgress,
        });
      } catch (error) {
        console.warn({
          message: "Failed to delete wallet",
        });
      }
    },
    [address, password]
  );

  return (
    <form
      onSubmit={handleDelete}
      className="grid gap-4"
      data-testid={TEST_IDS.form}
    >
      {Boolean(deleteError) && (
        <Alert variant="error" prefix="Error:" testId={TEST_IDS.errorAlert}>
          {(deleteError as Error).message}
        </Alert>
      )}
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
        variant="danger"
        disabled={password.length < 3}
        loading={isDeleting}
        progress={progress}
        data-testid={TEST_IDS.formSubmitButton}
      >
        {isDeleting ? (
          <>Deleting wallet...</>
        ) : (
          <>
            <TrashIcon className="h-5 w-5 mr-2" /> Delete wallet
          </>
        )}
      </Button>
    </form>
  );
};

export default DeleteWalletForm;

export const TEST_IDS = createTestIds("DeleteWalletForm", [
  "form",
  "formPasswordInput",
  "formSubmitButton",
  "resultAlert",
  "errorAlert",
]);
