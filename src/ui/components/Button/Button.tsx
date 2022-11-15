import clsx from "clsx";
import tw from "tailwind-styled-components";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export type ButtonSize = "sm" | "md" | "lg";

export type Props = JSX.IntrinsicElements["button"] & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const BaseButton = tw.button`border p-4 btn`;

const Button = ({ className, ...props }: Props) => {
  return (
    <BaseButton className={clsx(className)} {...props}>
      {props.children}
    </BaseButton>
  );
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
};

export default Button;
