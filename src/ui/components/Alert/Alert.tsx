import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export type AlertVariant = "success" | "error" | "warning" | "info";

export type Props = PropsWithChildren<{
  className?: string;
  variant?: AlertVariant;
  hideIcon?: boolean;
  prefix?: string;
}>;

const VARIANT_ICONS = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const Alert: FC<Props> = (props) => {
  const Icon = VARIANT_ICONS[props.variant ?? "info"];

  return (
    <div
      role="alert"
      className={clsx(
        "alert",
        {
          "alert-success": props.variant === "success",
          "alert-error": props.variant === "error",
          "alert-warning": props.variant === "warning",
          "alert-info": props.variant === "info",
        },
        props.className
      )}
    >
      <div>
        {!props.hideIcon && <Icon className="h-6 w-6 mr-1 lg:mr-2" />}
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

export default Alert;
