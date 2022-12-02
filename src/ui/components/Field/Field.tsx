import { FC } from "react";
import Alert from "../Alert";
import Input from "../Input";

type Props = JSX.IntrinsicElements["input"] & {
  label?: string;
  type?: "text" | "password";
  validation?: {
    message: string;
    status: "error" | "warning" | "info" | "success";
  };
};

const Field: FC<Props> = ({ label, validation, ...props }) => (
  <label className="grid gap-2">
    <span className="opacity-80">{label}</span>
    <Input {...props} placeholder={props.placeholder ?? label} />
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
