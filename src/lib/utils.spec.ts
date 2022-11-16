import { it, describe, expect } from "vitest";

import * as utils from "./utils";

describe("utils", () => {
  describe("formatPercentage", () => {
    it("formats a float number with a default 2 decimal digits", () => {
      expect(utils.formatPercentage(0.123456)).toBe("12.35%");
    });

    it("formats a float number with a arbitrary decimal digits", () => {
      expect(utils.formatPercentage(0.123456, 0)).toBe("12%");
    });
  });
});
