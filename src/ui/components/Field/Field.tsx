import { FC } from "react";
import { TestableProps } from "~/lib/test-utils";

import Alert from "../Alert";
import Input from "../Input";

type Props = JSX.IntrinsicElements["input"] &
  TestableProps<{
    label?: string;
    type?: "text" | "password";
    validation?: {
      message: string;
      status: "error" | "warning" | "info" | "success";
    };
  }>;

const Field: FC<Props> = ({ label, validation, ...props }) => (
  <label className="grid gap-2">
    <span className="opacity-80">{label}</span>
    <Input
      {...props}
      placeholder={props.placeholder ?? label}
      testId={props.testId || props["data-testid"]}
    />
    {validation && (
      <Alert variant={validation.status} className="mt-1">
        <span className="font-bold mr-2">
          {validation.status === "error" ? "Error:" : "Warning:"}
        </span>
        {validation.message}
      </Alert>
    )}
  </label>
);

export default Field;
