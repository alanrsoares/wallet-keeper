import clsx from "clsx";
import { FC, PropsWithChildren, useCallback, useState } from "react";

import { Tooltip } from "../Tooltip";

export type CopyToClipboardProps = PropsWithChildren<{
  className?: string;
  content?: string;
  tooltip?: string;
  dismissDelay?: number;
  checkmarkClassname?: string;
  testId?: string;
}>;

export const CopyToClipboard: FC<CopyToClipboardProps> = (props) => {
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
    <Tooltip tip={copied ? "Copied to clipboard ✓" : props.tooltip ?? ""}>
      <button
        className={clsx(
          "text-ellipsis whitespace-nowrap relative",
          props.className
        )}
        onClick={handleCopy}
        data-testid={props.testId}
      >
        {props.children}{" "}
      </button>
      {copied && (
        <span
          className={clsx(
            "-tracking-[.4em] text-sm ml-1 text-success absolute -right-4 md:-right-8",
            props.checkmarkClassname
          )}
        >
          {"✓✓"}
        </span>
      )}
    </Tooltip>
  );
};

CopyToClipboard.defaultProps = {
  tooltip: "Copy to clipboard",
  dismissDelay: 1000,
};
