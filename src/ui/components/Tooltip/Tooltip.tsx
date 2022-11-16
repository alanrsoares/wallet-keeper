import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  tip: string;
}>;

const Tooltip = (props: Props) => {
  return (
    <div className="tooltip" data-tip={props.tip}>
      {props.children}
    </div>
  );
};

export default Tooltip;
