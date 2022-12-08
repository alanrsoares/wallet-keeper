import clsx from "clsx";
import { forwardRef } from "react";

import { TestableProps } from "~/lib/test-utils";

export type InputProps = JSX.IntrinsicElements["input"] &
  TestableProps<{
    type: "text" | "password" | "email" | "number" | "tel" | "url";
  }>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
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
