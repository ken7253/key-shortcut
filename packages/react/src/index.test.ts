import { KeyShortcut } from "@key-shortcut/core";
import { describe, expect, test, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { useShortcut } from "./index";

describe("Hooks for managing shortcut keys.", () => {
  test("Keys and functions must be defined and registered.", () => {
    const key = ["a", "b"];
    const action = vi.fn();
    renderHook(() => useShortcut(key, action));

    expect(KeyShortcut.get(key)?.action).toBe(action);
  });

  test("If unmounted, perform deletion.", () => {
    const key = ["c", "d"];
    const action = vi.fn();
    const { unmount } = renderHook(() => useShortcut(key, action));

    expect(KeyShortcut.get(key)?.action).toBe(action);

    unmount();

    expect(KeyShortcut.get(key)?.action).toBeUndefined();
  });

  test("Update when another function is registered with the same key.", () => {
    const key = ["a", "b"];
    const oldAction = vi.fn();
    const { rerender } = renderHook(({ action }) => useShortcut(key, action), {
      initialProps: { action: oldAction },
    });

    expect(KeyShortcut.get(key)?.action).toBe(oldAction);

    const newAction = vi.fn();
    rerender({ action: newAction });

    expect(KeyShortcut.get(key)?.action).toBe(newAction);
  });
});
