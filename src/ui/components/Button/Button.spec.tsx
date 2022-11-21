import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { FC } from "react";
import { expect, it } from "vitest";

import type { Props } from "./Button";
import * as stories from "./Button.stories";

type StoryFile = typeof stories;
type StoryFileNamedExports = keyof StoryFile;

const { Primary, Secondary } = composeStories(stories) as Record<
  StoryFileNamedExports,
  FC<Props>
>;

it("renders primary button with default args", () => {
  render(<Primary />);
  const buttonElement = screen.getByText(/Primary/i);
  expect(buttonElement).not.toBeNull();
});

it("renders secondary button with default args", () => {
  render(<Secondary />);
  const buttonElement = screen.getByText(/Secondary/i);
  expect(buttonElement).not.toBeNull();
});
