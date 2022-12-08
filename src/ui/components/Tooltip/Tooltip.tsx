import clsx from "clsx";
import { FC } from "react";
import { TestableProps } from "~/lib/test-utils";

export type TooltipProps = JSX.IntrinsicElements["div"] &
  TestableProps<{
    tip: string;
  }>;

export const Tooltip: FC<TooltipProps> = ({
  tip,
  className,
  children,
  ...props
}) => (
  <div
    {...props}
    className={clsx("tooltip", className)}
    data-tip={tip}
    data-testid={props.testId || props["data-testid"]}
  >
    {children}
  </div>
);
