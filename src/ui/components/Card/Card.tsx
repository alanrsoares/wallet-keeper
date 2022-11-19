import clsx from "clsx";

type ElementKind = keyof JSX.IntrinsicElements;

type Props<T extends ElementKind> = JSX.IntrinsicElements[T] & {
  className?: string;
  bodyClassName?: string;
  title?: string;
  titleClassName?: string;
  as?: ElementKind;
};

const Card = <T extends ElementKind = "div">(props: Props<T>) => {
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
