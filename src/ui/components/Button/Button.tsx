import clsx from "clsx";
import tw from "tailwind-styled-components";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "warning"
  | "danger"
  | "success"
  | "ghost";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonLength = "wide" | "block";

export type ButtonShape = "circle" | "square";

export type Props = JSX.IntrinsicElements["button"] & {
  variant?: ButtonVariant;
  /**
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * @description "wide" is only available for "xs" and "sm" sizes
   * @description "block" is only available for "md", "lg", and "xl" sizes
   */
  length?: ButtonLength;
  shape?: ButtonShape;
};

const BaseButton = tw.button`border p-4 btn`;

const Button = ({ className, ...props }: Props) => {
  return (
    <BaseButton
      className={clsx(className, {
        // variants
        "btn-primary": props.variant === "primary",
        "btn-secondary": props.variant === "secondary",
        "btn-accent": props.variant === "accent",
        "btn-info": props.variant === "info",
        "btn-warning": props.variant === "warning",
        "btn-danger": props.variant === "danger",
        "btn-success": props.variant === "success",
        "btn-ghost": props.variant === "ghost",
        // sizes
        "btn-xs": props.size === "xs",
        "btn-sm": props.size === "sm",
        "btn-md": props.size === "md",
        "btn-lg": props.size === "lg",
        "btn-xl": props.size === "xl",
        // lengths
        "btn-wide": props.length === "wide",
        "btn-block": props.length === "block",
        // shapes
        "btn-circle": props.shape === "circle",
        "btn-square": props.shape === "square",
      })}
      {...props}
    >
      {props.children}
    </BaseButton>
  );
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
};

export default Button;
