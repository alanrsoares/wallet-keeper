import { FC, ChangeEvent } from "react";
import Alert from "../Alert";
import Input from "../Input";

type Props = {
  label?: string;
  placeholder?: string;
  type?: "text" | "password";
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  validation?: {
    message: string;
    status: "error" | "warning" | "info" | "success";
  };
};

const Field: FC<Props> = (props) => (
  <label className="grid gap-2">
    <span className="opacity-80">{props.label}</span>
    <Input
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder ?? props.label}
      onChange={props.onChange}
    />
    {props.validation && (
      <Alert variant={props.validation.status} className="mt-1">
        <span className="font-bold mr-2">
          {props.validation.status === "error" ? "Error:" : "Warning:"}
        </span>
        {props.validation.message}
      </Alert>
    )}
  </label>
);

export default Field;
