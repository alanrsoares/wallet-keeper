import { describe, it, expect } from "vitest";
import Maybe from "./maybe";

describe("Maybe", () => {
  it("should be able to derive a nullable value", () => {
    const maybe = Maybe.of("hello");

    expect(maybe.isSome).toBe(true);
    expect(maybe.valueOr("world")).toBe("hello");
  });
});
