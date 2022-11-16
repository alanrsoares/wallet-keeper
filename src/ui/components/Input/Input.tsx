import clsx from "clsx";

type Props = JSX.IntrinsicElements["input"] & {
  type: "text" | "password" | "email" | "number" | "tel" | "url";
};

const Input = ({ className, ...props }: Props) => {
  return <input className={clsx("input", className)} {...props} />;
};

Input.defaultProps = {
  type: "text",
};

export default Input;
