import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card, CardProps } from "./Card";

export default {
  title: "components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "Cards are used to display content in a consistent and organized way. They can be used to display text, images, and other types of content.",
      },
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  // @ts-ignore
  <Card {...args}>
    {typeof args.children === "string" ? (
      <Card.Body>{args.children}</Card.Body>
    ) : (
      args.children
    )}
  </Card>
);

const withProps = <T extends keyof JSX.IntrinsicElements>(
  args: CardProps<T>
) => {
  const Cmp = Template.bind({});
  Cmp.args = args;
  return Cmp;
};

export const Default = withProps({
  children: "Default Card",
  className: "bg-base-300",
});

export const CardWithTitle = withProps({
  children: (
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
    </Card.Body>
  ),
  className: "bg-base-300",
});

export const CardWithCustomClasses = withProps({
  children: "Card with Custom Classes",
  className: "bg-base-300",
});

export const CardWithCustomTag = withProps({
  children: "Card with Custom Tag",
  className: "bg-base-300",
  as: "section",
});
