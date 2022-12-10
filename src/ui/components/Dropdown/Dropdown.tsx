import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export type DropdownProps<T extends string> = {
  value: string;
  options: { value: T; label: string; url: string }[];
  className?: string;
};

export const Dropdown = <T extends string>({
  value,
  options,
  className,
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
        className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-40"
      >
        {options.map((option) => (
          <li key={option.value}>
            <a role="button" href={option.url} className="flex justify-between">
              {option.label}
              {value === option.value && (
                <span className="text-success">
                  <CheckIcon className="h-4 w-4" />
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  options: [],
};
