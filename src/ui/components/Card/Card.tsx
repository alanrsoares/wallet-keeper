import clsx from "clsx";
import { TestableProps } from "~/lib/test-utils";

type ElementKind = keyof JSX.IntrinsicElements;

type Props<T extends ElementKind> = JSX.IntrinsicElements[T] &
  TestableProps<{
    className?: string;
    bodyClassName?: string;
    title?: string;
    titleClassName?: string;
    testId?: string;
    as?: ElementKind;
  }>;

const Card = <T extends ElementKind = "div">(props: Props<T>) => {
  const Tag = props.as || "div";

  return (
    <Tag
      className={clsx("card", props.className)}
      data-testid={props.testId || props["data-testid"]}
    >
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
