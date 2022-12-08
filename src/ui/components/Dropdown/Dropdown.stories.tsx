import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "./Dropdown";

export default {
  title: "components/Dropdown",
  component: Dropdown,
  docs: {
    description: {
      component:
        "Dropdown, Dropdown, does whatever a Dropdown do.",
    },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  return <Dropdown {...args} />;
};

export const Default = Template.bind({});

Default.args = {};

