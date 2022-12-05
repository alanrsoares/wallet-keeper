import { ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { TestableProps } from "~/lib/test-utils";
import { formatPercentage } from "~/lib/utils";

const applyClassNames = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      warning: "btn-warning",
      danger: "btn-error",
      success: "btn-success",
      ghost: "btn-ghost",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
    },
    length: {
      wide: "btn-wide",
      block: "btn-block",
    },
    shape: {
      circle: "btn-circle",
      square: "btn-square",
    },
    loading: {
      true: "loading",
    },
    responsive: {
      true: "btn-sm md:btn-md",
    },
  },
});

type VProps = VariantProps<typeof applyClassNames> & {
  progress?: number;
};

export type ButtonVariant = NonNullable<VProps["variant"]>;

export type ButtonSize = NonNullable<VProps["size"]>;

export type ButtonLength = NonNullable<VProps["length"]>;

export type ButtonShape = NonNullable<VProps["shape"]>;

export type Props = TestableProps<JSX.IntrinsicElements["button"] & VProps>;

const Button = ({
  className,
  children,
  loading,
  progress,
  responsive,
  variant,
  size,
  length,
  testId,
  shape,
  ...props
}: Props) => {
  const content: ReactNode =
    progress && loading ? (
      <>
        {children}{" "}
        <span aria-label="progress" className="ml-2">
          {formatPercentage(progress, 0)}
        </span>
      </>
    ) : (
      children
    );

  return (
    <button
      className={applyClassNames({
        className,
        variant,
        size,
        length,
        responsive,
        shape,
      })}
      {...props}
      data-testid={testId ?? props["data-testid"]}
    >
      {content}
    </button>
  );
};

Button.defaultProps = {};

export default Button;
