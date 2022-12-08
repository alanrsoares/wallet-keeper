import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Alert, AlertProps } from "./Alert";

export default {
  title: "components/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          "Alerts are used to display important information to the user.",
      },
    },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

const withProps = (args: AlertProps) => {
  const Cmp = Template.bind({});
  Cmp.args = args;
  return Cmp;
};

export const Default = withProps({
  children: "Default",
});

export const Success = withProps({
  children: "Success",
  variant: "success",
});

// _ is ignored by Storybook when generating the story name
export const _Error = withProps({
  children: "Error",
  variant: "error",
});

export const Warning = withProps({
  children: "Warning",
  variant: "warning",
});

export const Info = withProps({
  children: "Info",
  variant: "info",
});

export const WithoutIcon = withProps({
  children: "Without Icon",
  hideIcon: true,
});
