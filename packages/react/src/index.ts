import { KeyShortcut } from "@key-shortcut/core";
import { useEffect } from "react";

export const useShortcut = (key: string[], action: () => void) => {
  useEffect(() => {
    KeyShortcut.add(key, action);

    return () => KeyShortcut.remove(key);
  }, [action, key]);
};
