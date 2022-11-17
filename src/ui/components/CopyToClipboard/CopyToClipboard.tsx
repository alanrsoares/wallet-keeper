import clsx from "clsx";
import React, { FC, PropsWithChildren, useCallback, useState } from "react";
import Tooltip from "../Tooltip";

type Props = PropsWithChildren<{
  className?: string;
  content?: string;
  tooltip?: string;
  dismissDelay?: number;
}>;

const CopyToClipboard: FC<Props> = (props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(props.content ?? String(props.children));

    setCopied(true);

    setTimeout(() => {
      // reset
      setCopied(false);
    }, 1000);
  }, []);

  return (
    <Tooltip tip={copied ? "Copied to clipboard!" : props.tooltip ?? ""}>
      <button
        className={clsx("overflow-x-clip text-ellipsis", props.className)}
        onClick={handleCopy}
      >
        {props.children} {copied ? "✓" : ""}
      </button>
    </Tooltip>
  );
};

CopyToClipboard.defaultProps = {
  tooltip: "Copy to clipboard",
  dismissDelay: 1000,
};

export default CopyToClipboard;
