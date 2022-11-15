import Button, { Props } from "./Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args: Props) => <Button {...args} />;

export const Primary = Template.bind({}, { children: "Primary" });
export const Secondary = Template.bind({}, { children: "Secondary" });
export const Large = Template.bind({}, { children: "Large", size: "lg" });
export const Small = Template.bind({}, { children: "Small", size: "sm" });
