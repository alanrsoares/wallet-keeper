import clsx from "clsx";

type Props = JSX.IntrinsicElements["div"] & {
  tip: string;
};

const Tooltip = ({ tip, className, ...props }: Props) => (
  <div className={clsx("tooltip", className)} data-tip={tip} {...props}>
    {props.children}
  </div>
);

export default Tooltip;
