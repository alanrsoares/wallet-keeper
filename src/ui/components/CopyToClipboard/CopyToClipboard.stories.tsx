import { ComponentMeta, ComponentStory } from "@storybook/react";
import Alert from "../Alert";

import Card from "../Card";
import Field from "../Field";
import CopyToClipboard from "./CopyToClipboard";

export default {
  title: "CopyToClipboard",
  component: CopyToClipboard,
} as ComponentMeta<typeof CopyToClipboard>;

const Template: ComponentStory<typeof CopyToClipboard> = (args) => (
  <Card className="bg-base-300 max-w-md">
    <Alert>
      <CopyToClipboard>{args.children}</CopyToClipboard>
    </Alert>
    <Field name="clipboard-test" placeholder="Paste copied content here" />
  </Card>
);

const withProps = (args: any) => {
  const Cmp = Template.bind({});
  Cmp.args = args;
  return Cmp;
};

export const Default = withProps({
  children: "click to copy me to clipboard",
});
