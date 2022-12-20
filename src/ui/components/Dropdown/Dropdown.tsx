import { CheckIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { createContainer } from "unstated-next";

import { Button } from "../Button";

const { Provider: DropdownProvider, useContainer: useDropdown } =
  createContainer((initialValue?: string) => useState(initialValue));

const variance = cva("dropdown", {
  variants: {
    placement: {
      left: "dropdown-left",
      right: "dropdown-right",
      bottom: "dropdown-bottom",
      top: "dropdown-top",
    },
    hover: {
      true: "dropdown-hover",
    },
    align: {
      end: "dropdown-end",
      start: "dropdown-start",
    },
  },
});

type VProps = VariantProps<typeof variance>;

export type DropdownProps<T extends string> = VProps &
  PropsWithChildren<{
    value: string;
    onChange?: (value: T) => void;
  }>;

const DropdownInner = <T extends string>(props: DropdownProps<T>) => {
  const [value] = useDropdown();

  useEffect(() => {
    props.onChange?.(value as T);
  }, [value]);

  return (
    <div
      className={variance({
        placement: props.placement,
        hover: props.hover,
        align: props.align,
      })}
    >
      {props.children}
    </div>
  );
};

const DropdownContainer = <T extends string>({
  children,
  ...props
}: DropdownProps<T>) => {
  return (
    <DropdownProvider initialState={props.value}>
      <DropdownInner {...props}>{children}</DropdownInner>
    </DropdownProvider>
  );
};

DropdownContainer.defaultProps = {
  options: [],
};

const DropdownTrigger = Button.bind({});

DropdownTrigger.defaultProps = {
  size: "sm",
  tabIndex: 0,
};

const DropdownContent = tw.ul`
  dropdown-content menu p-2 
  shadow bg-base-300 rounded-box 
  w-40 grid gap-1
`;

DropdownContent.defaultProps = {
  role: "listbox",
  tabIndex: 0,
};

const DropdownItem: FC<PropsWithChildren<{ value: string }>> = (props) => {
  const [value, setValue] = useDropdown();

  return (
    <li>
      <button
        role="option"
        className="flex justify-between"
        onClick={setValue.bind(null, props.value)}
      >
        {props.children}
        {value === props.value && (
          <span className="text-success">
            <CheckIcon className="h-4 w-4" />
          </span>
        )}
      </button>
    </li>
  );
};

export const Dropdown = Object.assign(DropdownContainer, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
});
