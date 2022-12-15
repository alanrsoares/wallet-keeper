import { FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { TestableProps } from "~/lib/test-utils";
import { formatPercentage } from "~/lib/utils";

const variance = cva("btn font-black", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary text-black",
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
    outline: {
      true: "btn-outline",
    },
  },
});

type VProps = VariantProps<typeof variance> & {
  progress?: number;
};

export type ButtonVariant = NonNullable<VProps["variant"]>;

export type ButtonSize = NonNullable<VProps["size"]>;

export type ButtonLength = NonNullable<VProps["length"]>;

export type ButtonShape = NonNullable<VProps["shape"]>;

export type ButtonProps = TestableProps<
  JSX.IntrinsicElements["button"] & VProps
>;

export const Button: FC<ButtonProps> = ({
  className,
  children,
  loading,
  progress,
  responsive,
  variant,
  size,
  length,
  shape,
  outline,
  testId,
  ...props
}) => {
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
      className={variance({
        className,
        variant,
        size,
        length,
        responsive,
        shape,
        outline,
      })}
      {...props}
      data-testid={testId ?? props["data-testid"]}
    >
      {content}
    </button>
  );
};

Button.defaultProps = {};
