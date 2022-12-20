import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Alert, Card, CopyToClipboard, CopyToClipboardProps, Field } from "../";

export default {
  title: "components/CopyToClipboard",
  component: CopyToClipboard,
} as ComponentMeta<typeof CopyToClipboard>;

const Template: ComponentStory<typeof CopyToClipboard> = (args) => (
  <Card className="bg-base-300 max-w-md">
    <Card.Body>
      <Alert>
        <CopyToClipboard {...args} />
      </Alert>
      <Field name="clipboard-test" placeholder="Paste copied content here" />
    </Card.Body>
  </Card>
);

const withProps = (args: CopyToClipboardProps) => {
  const Cmp = Template.bind({});
  Cmp.args = args;
  return Cmp;
};

export const Default = withProps({
  children: "click to copy me to clipboard",
});
