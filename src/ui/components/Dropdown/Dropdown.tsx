import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export type DropdownProps<T extends string> = {
  value: string;
  options: ReadonlyArray<{ value: T; label: string; url: string }>;
  className?: string;
  onChange?: (value: T) => void;
};

export const Dropdown = <T extends string>({
  value,
  options,
  className,
  onChange,
}: DropdownProps<T>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={0}
        className={clsx("btn btn-sm m-1 uppercase", className)}
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
