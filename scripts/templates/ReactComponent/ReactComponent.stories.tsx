import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { ReactComponent } from "./ReactComponent";

export default {
  title: "components/ReactComponent",
  component: ReactComponent,
  docs: {
    description: {
      component:
        "ReactComponent, ReactComponent, does whatever a ReactComponent do.",
    },
  },
} as ComponentMeta<typeof ReactComponent>;

const Template: ComponentStory<typeof ReactComponent> = (args) => {
  return <ReactComponent {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
