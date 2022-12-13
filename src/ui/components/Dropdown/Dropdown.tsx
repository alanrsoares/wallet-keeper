import { CheckIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

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

export type DropdownProps<T extends string> = VProps & {
  value: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  triggerClassName?: string;
  onChange?: (value: T) => void;
};

export const Dropdown = <T extends string>({
  value,
  options,
  triggerClassName,
  onChange,
  placement,
  hover,
  align,
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
      <label
        tabIndex={0}
        className={clsx("btn btn-sm m-1 uppercase", triggerClassName)}
      >
        {selectedOption?.label}
      </label>
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
