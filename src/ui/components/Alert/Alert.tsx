import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

import { TestableProps } from "~/lib/test-utils";

export const VARIANT_ICONS = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const variance = cva("alert", {
  variants: {
    variant: {
      success: "alert-success",
      error: "alert-error",
      warning: "alert-warning",
      info: "alert-info",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    },
  },
});

type VProps = VariantProps<typeof variance> & {
  className?: string;
  hideIcon?: boolean;
  prefix?: string;
};

export type AlertVariant = NonNullable<VProps["variant"]>;

export type AlertProps = PropsWithChildren<TestableProps<VProps>>;

export const Alert: FC<AlertProps> = ({
  className,
  variant,
  shadow,
  testId,
  ...props
}) => {
  const Icon = VARIANT_ICONS[variant ?? "info"];

  return (
    <div
      role="alert"
      className={variance({
        className: className,
        variant: variant,
        shadow: shadow,
      })}
      data-testid={testId || props["data-testid"]}
      {...props}
    >
      <div>
        {!props.hideIcon && (
          <Icon
            className={clsx("h-6 w-6 mr-1 lg:mr-2 flex-shrink-0", {
              "stroke-info": !variant,
            })}
          />
        )}
        <span className="grid md:flex md:items-center">
          {props.prefix && (
            <strong className="font-bold text-sm md:text-base mr-1 lg:mr-2 whitespace-nowrap">
              {props.prefix}
            </strong>
          )}
          {props.children}
        </span>
      </div>
    </div>
  );
};
