import clsx from "clsx";
import { TestableProps } from "~/lib/test-utils";

type Props = JSX.IntrinsicElements["div"] &
  TestableProps<{
    tip: string;
  }>;

const Tooltip = ({ tip, className, children, ...props }: Props) => (
  <div
    {...props}
    className={clsx("tooltip", className)}
    data-tip={tip}
    data-testid={props.testId || props["data-testid"]}
  >
    {children}
  </div>
);

export default Tooltip;
