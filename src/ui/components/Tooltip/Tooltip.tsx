import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

import { TestableProps } from "~/lib/test-utils";

const variance = cva("tooltip", {
  variants: {
    position: {
      top: "tooltip-top",
      right: "tooltip-right",
      bottom: "tooltip-bottom",
      left: "tooltip-left",
    },
    variant: {
      primary: "tooltip-primary",
      secondary: "tooltip-secondary",
      accent: "tooltip-accent",
      info: "tooltip-info",
      warning: "tooltip-warning",
      danger: "tooltip-error",
    },
    open: {
      true: "tooltip-open",
    },
  },
});

type VProps = VariantProps<typeof variance>;

export type TooltipProps = JSX.IntrinsicElements["div"] &
  VProps &
  TestableProps<{
    tip: string;
  }>;

export const Tooltip: FC<TooltipProps> = ({
  tip,
  className,
  children,
  position,
  variant,
  open,
  ...props
}) => (
  <div
    {...props}
    className={variance({ className, position, variant, open })}
    data-tip={tip}
    data-testid={props.testId || props["data-testid"]}
  >
    {children}
  </div>
);
