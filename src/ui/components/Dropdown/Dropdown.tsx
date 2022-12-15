import { CheckIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Button, ButtonProps } from "../Button";

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
  Omit<ButtonProps, "onChange"> & {
    value: string;
    options: ReadonlyArray<{ value: T; label: string }>;
    onChange?: (value: T) => void;
  };

export const Dropdown = <T extends string>({
  value,
  options,
  onChange,
  placement,
  hover,
  align,
  ...props
}: DropdownProps<T>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={variance({
        placement,
        hover,
        align,
      })}
    >
      <Button tabIndex={0} size="sm" {...props}>
        {selectedOption?.label}
      </Button>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-40 grid gap-1"
      >
        {options.map((option) => (
          <li key={option.value}>
            <button
              role="option"
              className="flex justify-between"
              onClick={() => {
                onChange?.(option.value);
              }}
            >
              {option.label}
              {value === option.value && (
                <span className="text-success">
                  <CheckIcon className="h-4 w-4" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  options: [],
};
