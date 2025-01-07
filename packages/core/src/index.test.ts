import { describe, test, expect, vi } from "vitest";

import { KeyShortcut } from "./index";

describe("The KeyShortcut class manages keys and processing.", () => {
  test("Registration and recall.", () => {
    const ctx = new KeyShortcut();
    const action = vi.fn;

    ctx.add(["a", "b"], action);
    const item = ctx.get(["a", "b"]);

    expect(item?.action).toBe(action);
  });

  test("Delete registered data.", () => {
    const key = ["a", "b"];
    const ctx = new KeyShortcut();
    const action = vi.fn;

    ctx.add(key, action);
    expect(ctx.get(key)?.action).toBe(action);

    ctx.remove(key);

    expect(ctx.get(key)).toBe(undefined);
  });
});
