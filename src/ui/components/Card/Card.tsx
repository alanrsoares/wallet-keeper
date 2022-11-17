import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  bodyClassName?: string;
  title?: string;
  titleClassName?: string;
  as?: keyof JSX.IntrinsicElements;
}>;

const Card = (props: Props) => {
  const Tag = props.as || "div";

  return (
    <Tag className={clsx("card", props.className)}>
      {props.title && (
        <div className={clsx("card-title", props.titleClassName)}>
          {props.title}
        </div>
      )}
      <div className="card-body">{props.children}</div>
    </Tag>
  );
};

export default Card;
