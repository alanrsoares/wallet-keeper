import clsx from "clsx";
import { forwardRef } from "react";

import { TestableProps } from "~/lib/test-utils";

type Props = JSX.IntrinsicElements["input"] &
  TestableProps<{
    type: "text" | "password" | "email" | "number" | "tel" | "url";
  }>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, testId, ...props }, ref) => (
    <input
      {...props}
      className={clsx("input", className)}
      data-testid={testId ?? props["data-testid"]}
      ref={ref}
    />
  )
);

Input.defaultProps = {
  type: "text",
};

export default Input;
