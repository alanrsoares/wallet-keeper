import Button, { Props } from "./Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args: Props) => <Button {...args} />;

export const Primary = Template.bind(
  {},
  {
    children: "Primary",
    variant: "primary",
  }
);

export const Secondary = Template.bind(
  {},
  {
    children: "Secondary",
    variant: "secondary",
  }
);

export const Accent = Template.bind(
  {},
  {
    children: "Accent",
    variant: "accent",
  }
);

export const Info = Template.bind(
  {},
  {
    children: "Info",
    variant: "info",
  }
);

export const Warning = Template.bind(
  {},
  {
    children: "Warning",
    variant: "warning",
  }
);

export const Danger = Template.bind(
  {},
  {
    children: "Danger",
    variant: "danger",
  }
);

export const Success = Template.bind(
  {},
  {
    children: "Success",
    variant: "success",
  }
);

export const Ghost = Template.bind(
  {},
  {
    children: "Ghost",
    variant: "ghost",
  }
);

export const ExtraSmall = Template.bind(
  {},
  {
    children: "Xs",
    size: "xs",
  }
);

export const Small = Template.bind(
  {},
  {
    children: "Small",
    size: "sm",
  }
);

export const Large = Template.bind(
  {},
  {
    children: "Large",
    size: "lg",
  }
);

export const ExtraLarge = Template.bind(
  {},
  {
    children: "Xl",
    size: "xl",
  }
);

export const Wide = Template.bind(
  {},
  {
    children: "Wide",
    length: "wide",
  }
);

export const Block = Template.bind(
  {},
  {
    children: "Block",
    length: "block",
  }
);
