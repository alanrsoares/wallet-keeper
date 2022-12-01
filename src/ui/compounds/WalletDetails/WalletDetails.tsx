import {
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import { createTestIds } from "~/lib/test-utils";
import { maskAddress } from "~/lib/utils";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import Card from "~/ui/components/Card";
import CopyToClipboard from "~/ui/components/CopyToClipboard";
import Identicon from "~/ui/components/Identicon";
import Tooltip from "~/ui/components/Tooltip";

import DeleteWalletForm from "./DeleteWalletForm";
import ExportWalletForm from "./ExportWalletForm";

export type Props = {
  address: string;
};

type WalletAction = "delete" | "export" | "lock";

const WalletDetails = ({ address }: Props) => {
  const { state, queries } = useWalletKeeper();

  const [action, setAction] = useState<WalletAction>("lock");

  const { data: balance } = queries.getBalance({ address });

  const account = state.accountsByAddress[address];

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
            <div className="ring-4 ring-black/20 hover:ring-primary/30 rounded-full h-12 w-12 shadow-md transition-all">
              <Identicon address={address} diameter={48} />
            </div>
            <div className="grid gap-1">
              <span
                className="font-semibold font-mono whitespace-nowrap"
                data-testid={TEST_IDS.walletLabel}
              >
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
            testId={TEST_IDS.walletAddress}
          >
            {maskAddress(address)}
          </CopyToClipboard>
        </div>
        <div className="w-full grid gap-2 md:place-items-end md:justify-end-end">
          <Button
            onClick={() => setAction(action === "lock" ? "export" : "lock")}
            className="w-full md:w-auto"
            size="sm"
            data-testid={TEST_IDS.exportToggle}
          >
            {action === "export" ? (
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
            onClick={() => setAction(action === "lock" ? "delete" : "lock")}
            className="w-full md:w-auto"
            variant="danger"
            size="sm"
          >
            {action === "delete" ? (
              <>
                <XCircleIcon className="h-5 w-5 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <TrashIcon className="h-5 w-5 mr-2" />
                Delete wallet
              </>
            )}
          </Button>
        </div>
      </div>
      {action === "export" && <ExportWalletForm address={address} />}
      {action === "delete" && <DeleteWalletForm address={address} />}
    </Card>
  );
};

export default WalletDetails;

export const TEST_IDS = createTestIds("WalletDetails", {
  walletLabel: "wallet-label",
  walletAddress: "wallet-address",
  exportToggle: "export-toggle",
});
