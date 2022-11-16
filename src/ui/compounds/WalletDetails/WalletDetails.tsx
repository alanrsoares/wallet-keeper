import {
  DocumentDuplicateIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { useWalletKeeper } from "~/lib/contexts/walletKeeper";
import Alert from "~/ui/components/Alert";
import Button from "~/ui/components/Button";
import CopyToClipboard from "~/ui/components/CopyToClipboard";
import Field from "~/ui/components/Field";
import Tooltip from "~/ui/components/Tooltip";

type Props = {
  address: string;
};

const TOOLTIPS = {
  copyAddress: "Copy address to clipboard",
  copied: "Copied to clipboard!",
};

type WalletAction = "VIEW_MEMONIC_PHRASE" | "VIEW_QR_CODE" | "COPY_ADDRESS";

const WalletDetails = (props: Props) => {
  const walletKeeper = useWalletKeeper();
  const {
    mutateAsync: unlockWallet,
    isLoading,
    error,
  } = walletKeeper.mutations.unlockWallet();

  const [progress, setProgress] = useState(0);

  const [tooltip, setTooltip] = useState(TOOLTIPS.copyAddress);
  const [action, setAction] = useState<WalletAction | null>(null);
  const [password, setPassword] = useState("");
  const [mnemonic, setMnemonic] = useState("");

  const account = walletKeeper.state.accountsByAddress[props.address];

  const handleReset = useCallback(() => {
    setProgress(0);
    setAction(null);
    setPassword("");
    setMnemonic("");
  }, []);

  const handleUnlock = useCallback(async () => {
    const wallet = await unlockWallet({
      address,
      password,
      onProgress: setProgress,
    });

    setMnemonic(wallet.mnemonic.phrase);
  }, [props.address, password]);

  const handleCopyAddress = useCallback(() => {
    navigator.clipboard.writeText(address);
    setTooltip(TOOLTIPS.copied);
    setTimeout(() => {
      setTooltip(TOOLTIPS.copyAddress);
    }, 1000);
  }, [props.address]);

  const handleCopyMnemoic = useCallback(() => {
    navigator.clipboard.writeText(address);
    setTooltip(TOOLTIPS.copied);
    setTimeout(() => {
      setTooltip(TOOLTIPS.copyAddress);
    }, 1000);
  }, []);

  if (!account) {
    return <div>Wallet not found: {props.address}</div>;
  }

  const { displayName, address } = account;

  return (
    <div className="card-body">
      <div className="card-title justify-between items-center">
        <h3>
          {displayName} -{" "}
          <Tooltip tip={tooltip}>
            <button className="badge badge-outline" onClick={handleCopyAddress}>
              {address.slice(0, 6)}...{address.slice(-4)}{" "}
              <DocumentDuplicateIcon className="h-4 w-4 ml-2" />
            </button>
          </Tooltip>
        </h3>
        <Button onClick={setAction.bind(null, "VIEW_MEMONIC_PHRASE")}>
          <LockClosedIcon className="h-5 w-5 mr-2" />
          View mnemonic phrase
        </Button>
      </div>
      {action === "VIEW_MEMONIC_PHRASE" && (
        <>
          <div className="">
            <Field
              name="password"
              label="Wallet Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {mnemonic ? (
            <Alert variant="success">
              <CopyToClipboard>{mnemonic}</CopyToClipboard>
            </Alert>
          ) : (
            <div className="card-actions">
              <Button
                disabled={password.length < 3}
                onClick={handleUnlock}
                loading={isLoading}
                progress={progress}
                length="block"
              >
                {isLoading ? (
                  "Unlocking..."
                ) : (
                  <>
                    <EyeIcon className="h-6 w-6 mr-2" /> Unlock
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WalletDetails;
