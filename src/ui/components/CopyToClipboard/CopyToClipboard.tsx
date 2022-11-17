import clsx from "clsx";
import React, { FC, PropsWithChildren, useCallback, useState } from "react";

import Tooltip from "../Tooltip";

export type Props = PropsWithChildren<{
  className?: string;
  content?: string;
  tooltip?: string;
  dismissDelay?: number;
  checkmarkClassname?: string;
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
        className={clsx(
          "text-ellipsis whitespace-nowrap relative",
          props.className
        )}
        onClick={handleCopy}
      >
        {props.children}{" "}
        {copied && (
          <span
            className={clsx(
              "-tracking-[.4em] text-sm ml-1 text-success absolute -right-3.5",
              props.checkmarkClassname
            )}
          >
            {"✓✓"}
          </span>
        )}
      </button>
    </Tooltip>
  );
};

CopyToClipboard.defaultProps = {
  tooltip: "Copy to clipboard",
  dismissDelay: 1000,
};

export default CopyToClipboard;
