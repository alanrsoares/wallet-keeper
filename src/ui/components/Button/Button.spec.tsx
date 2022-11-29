import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import * as stories from "./Button.stories";

const { Primary, Secondary } = composeStories(stories);

it("renders primary button with default args", () => {
  render(<Primary />);
  const buttonElement = screen.getByText(/Primary/i);
  expect(buttonElement).toBeTruthy();
});

it("renders secondary button with default args", () => {
  render(<Secondary />);
  const buttonElement = screen.getByText(/Secondary/i);
  expect(buttonElement).toBeTruthy();
});
