import clsx from "clsx";
import { PropsWithChildren } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { TestableProps } from "~/lib/test-utils";

type ElementKind = keyof JSX.IntrinsicElements;

export type CardProps<T extends ElementKind> = TestableProps<
  JSX.IntrinsicElements[T] & {
    className?: string;
    bodyClassName?: string;
    titleClassName?: string;
    as?: ElementKind;
  }
>;

const CardWrapper = <T extends ElementKind = "div">(props: CardProps<T>) => {
  const Tag = props.as || "div";

  return (
    <Tag
      className={clsx("card", props.className)}
      data-testid={props.testId || props["data-testid"]}
    >
      <div className="card-body">{props.children}</div>
    </Tag>
  );
};

export const Card = Object.assign(CardWrapper, {
  Title: tw.div`card-title`,
});
