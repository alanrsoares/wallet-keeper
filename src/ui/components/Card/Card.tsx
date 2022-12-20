import clsx from "clsx";
import tw from "tailwind-styled-components/dist/tailwind";

import { TestableProps } from "~/lib/test-utils";

type ElementKind = keyof JSX.IntrinsicElements;

export type CardProps<T extends ElementKind> = TestableProps<
  JSX.IntrinsicElements[T] & {
    className?: string;
    as?: ElementKind;
  }
>;

const CardContainer = <T extends ElementKind = "div">(props: CardProps<T>) => {
  const Tag = props.as ?? "div";

  return (
    <Tag
      className={clsx("card", props.className)}
      data-testid={props.testId || props["data-testid"]}
    >
      {props.children}
    </Tag>
  );
};

export const Card = Object.assign(CardContainer, {
  Title: tw.div`card-title`,
  Body: tw.div`card-body`,
});
