import { describe, it, expect } from "vitest";
import { TOOL_COMPONENTS } from "../../src/tools/registry";

describe("registry", () => {
  it("should register the starter tool components", () => {
    expect(Object.keys(TOOL_COMPONENTS)).toEqual(["hello-world"]);
    expect(TOOL_COMPONENTS["hello-world"]).toBeDefined();
  });
});
