import clsx from "clsx";
import { TestableProps } from "~/lib/test-utils";

type Props = JSX.IntrinsicElements["input"] &
  TestableProps<{
    type: "text" | "password" | "email" | "number" | "tel" | "url";
  }>;

const Input = ({ className, ...props }: Props) => {
  return (
    <input
      className={clsx("input", className)}
      {...props}
      data-testid={props.testId || props["data-testid"]}
    />
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
