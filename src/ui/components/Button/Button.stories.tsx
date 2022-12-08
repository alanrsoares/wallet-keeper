import { PlusIcon } from "@heroicons/react/24/outline";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export default {
  title: "components/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Buttons are used to trigger actions or submit forms. They are used to indicate the next step in a process.",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const withProps = (args: ButtonProps) => {
  const Cmp = Template.bind({});
  Cmp.args = args;
  return Cmp;
};

export const Default = withProps({
  children: "Default",
});

export const Primary = withProps({
  children: "Primary",
  variant: "primary",
});

export const Secondary = withProps({
  children: "Secondary",
  variant: "secondary",
});

export const Accent = withProps({
  children: "Accent",
  variant: "accent",
});

export const Info = withProps({
  children: "Info",
  variant: "info",
});

export const Warning = withProps({
  children: "Warning",
  variant: "warning",
});

export const Danger = withProps({
  children: "Danger",
  variant: "danger",
});

export const Success = withProps({
  children: "Success",
  variant: "success",
});

export const Ghost = withProps({
  children: "Ghost",
  variant: "ghost",
});

export const ExtraSmall = withProps({
  children: "Extra Small",
  size: "xs",
});

export const Small = withProps({
  children: "Small",
  size: "sm",
});

export const Large = withProps({
  children: "Large",
  size: "lg",
});

export const ExtraLarge = withProps({
  children: "Extra Large",
  size: "xl",
});

export const Wide = withProps({
  children: "Wide",
  length: "wide",
});

export const Block = withProps({
  children: "Block",
  length: "block",
});

export const Responsive_Block = withProps({
  children: "Responsive Block",
  responsive: true,
  length: "block",
});

export const Circle = withProps({
  children: <PlusIcon className="h-6 w-6" />,
  shape: "circle",
});

export const Square = withProps({
  children: <PlusIcon className="h-6 w-6" />,
  shape: "square",
});
