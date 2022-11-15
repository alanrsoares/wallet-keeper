import clsx from "clsx";

type Props = JSX.IntrinsicElements["button"] & {};

const Button = ({ className, ...props }: Props) => {
  return (
    <button className={clsx("border p-4 btn", className)} {...props}>
      index
    </button>
  );
};

export default Button;
