import React, { FC } from "react";
import Input from "../Input";

type Props = {
  label?: string;
  type?: "text" | "password";
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Field: FC<Props> = (props) => {
  return (
    <label className="grid gap-2">
      <span className="opacity-80">{props.label}</span>
      <Input
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.label}
        onChange={props.onChange}
      />
    </label>
  );
};

export default Field;
