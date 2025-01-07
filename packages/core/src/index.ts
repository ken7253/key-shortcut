type RegisterItem = {
  action: () => void;
};

type Register = Record<string, RegisterItem> | null;

class InternalKeyShortcut {
  constructor() {
    const keydownHandler = (event: KeyboardEvent) => {
      const { key, repeat } = event;
      if (repeat) return;

      this.#pressedKey = [...this.#pressedKey, key];
      const registerItem = this.get(this.#pressedKey);

      if (registerItem === undefined) return;

      event.preventDefault();
      registerItem.action();
    };

    const keyupHandler = (event: KeyboardEvent) => {
      const { key } = event;
      this.#pressedKey = this.#pressedKey.filter((v) => v !== key);
    };

    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);
  }

  #pressedKey: string[] = [];

  #register: Register = null;

  static #joinKey(key: string[]) {
    return key.sort().join("+");
  }

  /**
   * Register shortcut key information.
   */
  add(key: string[], action: () => void) {
    const registerKey = InternalKeyShortcut.#joinKey(key);
    const item: RegisterItem = {
      action,
    };

    this.#register = {
      ...this.#register,
      [registerKey]: item,
    };
  }

  /**
   * Deletes a registered shortcut key.
   */
  remove(key: string[]) {
    const registerKey = InternalKeyShortcut.#joinKey(key);

    if (this.#register == null) return;

    if (Object.hasOwn(this.#register, registerKey)) {
      delete this.#register[registerKey];
    }
  }

  /**
   * The process of retrieving information that has already been registered based on a key.
   */
  get(key: string[]): RegisterItem | undefined {
    const registerKey = InternalKeyShortcut.#joinKey(key);

    return this.#register?.[registerKey];
  }
}

export const KeyShortcut = new InternalKeyShortcut();
