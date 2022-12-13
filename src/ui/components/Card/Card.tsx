import clsx from "clsx";
import { TestableProps } from "~/lib/test-utils";

type ElementKind = keyof JSX.IntrinsicElements;

export type CardProps<T extends ElementKind> = TestableProps<
  JSX.IntrinsicElements[T] & {
    className?: string;
    bodyClassName?: string;
    title?: string;
    titleClassName?: string;
    as?: ElementKind;
  }
>;

export const Card = <T extends ElementKind = "div">(props: CardProps<T>) => {
  const Tag = props.as || "div";

  return (
    <Tag
      className={clsx("card", props.className)}
      data-testid={props.testId || props["data-testid"]}
    >
      <div className="card-body">
        {props.title && (
          <div className={clsx("card-title", props.titleClassName)}>
            {props.title}
          </div>
        )}

        {props.children}
      </div>
    </Tag>
  );
};
