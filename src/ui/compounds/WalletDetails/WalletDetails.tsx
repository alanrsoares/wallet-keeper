import {
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  FC,
  FormEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useState,
} from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { createTestIds } from "~/lib/test-utils";
import { maskAddress } from "~/lib/utils";
import {
  Alert,
  Button,
  ButtonProps,
  Card,
  CopyToClipboard,
  Identicon,
  Tooltip,
} from "~/ui/components";

import DeleteWalletForm from "./DeleteWalletForm";
import ExportWalletForm from "./ExportWalletForm";

export type Props = {
  address: string;
};

type WalletAction = "delete" | "export" | "lock";

const WalletDetails = ({ address }: Props) => {
  const { state, queries, mutations } = useWalletKeeper();

  const [action, setAction] = useState<WalletAction>("lock");

  const { data: balance } = queries.getBalance({ address });

  const account = state.accountsByAddress[address];

  const { mutateAsync: renameWallet } = mutations.renameWallet();

  if (!account) {
    return (
      <Alert variant="error" prefix="Wallet not found:">
        {address}
      </Alert>
    );
  }

  const handleRenameWallet = useCallback(
    async (e: FormEvent<HTMLInputElement>) => {
      e.persist();

      const { value: displayName } = e.currentTarget;

      try {
        await renameWallet({
          address,
          displayName: displayName.slice(0, Math.min(displayName.length, 32)),
        });
      } catch (error) {
        console.warn({
          message: "Failed to rename wallet",
          error,
        });
      }
    },
    []
  );

  return (
    <Card as="article">
      <div className="card-title flex-col items-start md:flex-row justify-between">
        <div className="grid gap-4">
          <div className="flex gap-4 items-center">
            <div className="ring-4 ring-black/20 hover:ring-primary/30 rounded-full h-12 w-12 shadow-md transition-all">
              <Identicon address={address} diameter={48} />
            </div>
            <div className="grid gap-1">
              <input
                className="font-semibold font-mono whitespace-nowrap bg-transparent flex flex-shrink-0 overflow-hidden overflow-ellipsis"
                data-testid={TEST_IDS.walletLabel}
                contentEditable={true}
                onInput={handleRenameWallet}
                value={account.displayName}
              />
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
            testId={TEST_IDS.walletAddress}
          >
            {maskAddress(address)}
          </CopyToClipboard>
        </div>
        <div className="w-full grid md:place-items-end md:justify-end-end">
          <div className="grid gap-2">
            <ToggleButton
              isActive={action === "export"}
              onClick={(isActive) => setAction(isActive ? "lock" : "export")}
              testId={TEST_IDS.exportToggle}
            >
              {(isActive) =>
                isActive ? (
                  <>
                    <EyeSlashIcon className="h-5 w-5 mr-2" /> Hide private key
                  </>
                ) : (
                  <>
                    <EyeIcon className="h-5 w-5 mr-2" /> Show private key
                  </>
                )
              }
            </ToggleButton>
            <ToggleButton
              isActive={action === "delete"}
              onClick={(isActive) => setAction(isActive ? "lock" : "delete")}
              variant="danger"
              testId={TEST_IDS.deleteToggle}
            >
              {(isActive) =>
                isActive ? (
                  <>
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <TrashIcon className="h-5 w-5 mr-2" />
                    Delete wallet
                  </>
                )
              }
            </ToggleButton>
          </div>
        </div>
      </div>
      {action === "export" && <ExportWalletForm address={address} />}
      {action === "delete" && <DeleteWalletForm address={address} />}
    </Card>
  );
};

export default WalletDetails;

type ToggleButtonProps = Omit<ButtonProps, "children" | "onClick"> & {
  isActive: boolean;
  children?: ((isActive: boolean) => ReactNode) | ReactNode;
  onClick?: (
    isActive: boolean,
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
};

const ToggleButton: FC<ToggleButtonProps> = ({
  isActive,
  className,
  children,
  onClick,
  ...props
}) => (
  <Button
    className={clsx("w-full md:w-auto", className)}
    variant={props.variant}
    {...props}
    onClick={(e) => onClick?.(isActive, e)}
  >
    {typeof children === "function" ? children(isActive) : children}
  </Button>
);

ToggleButton.defaultProps = {
  size: "sm",
};

export const TEST_IDS = createTestIds("WalletDetails", [
  "walletLabel",
  "walletAddress",
  "exportToggle",
  "deleteToggle",
]);
