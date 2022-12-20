import type { ComponentStory, ComponentMeta } from "@storybook/react";
import clsx from "clsx";
import { useState } from "react";
import { Dropdown, DropdownProps } from "./Dropdown";

export default {
  title: "components/Dropdown",
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown is used to select one of the options from a list of options.",
      },
    },
  },
} as ComponentMeta<typeof Dropdown>;

const DEFAULT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
];

type TemplateProps = Omit<
  DropdownProps<string>,
  "value" | "options" | "onChange"
> & {
  wraperClassName?: string;
};

const InnerTemplate = (args: TemplateProps) => {
  const [value, setValue] = useState(DEFAULT_OPTIONS[0]?.value);

  return (
    <section className={clsx("grid w-full ", args.wraperClassName)}>
      <Dropdown {...args} value={value} onChange={setValue}>
        <Dropdown.Trigger>Dropdown</Dropdown.Trigger>
        <Dropdown.Content>
          {DEFAULT_OPTIONS.map((option) => (
            <Dropdown.Item key={option.value} value={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </section>
  );
};

const Template: ComponentStory<typeof InnerTemplate> = InnerTemplate;

const withProps = (args: TemplateProps) => {
  const Cmp = Template.bind({});
  Cmp.args = args;
  return Cmp;
};

export const Default = withProps({});

export const DropdownWithHover = withProps({
  hover: true,
});

export const DropdownWithPlacement = withProps({
  placement: "left",
  wraperClassName: "place-items-end",
});
