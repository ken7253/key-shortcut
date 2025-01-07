type RegisterItem = {
  action: () => void;
};

type Register = Record<string, RegisterItem> | null;

class InternalKeyShortcut {
  #register: Register = null;

  /**
   * Register shortcut key information.
   */
  add(key: string[], action: () => void) {
    const registerKey = key.join("+");
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
    const registerKey = key.join("+");

    if (this.#register == null) return;

    if (Object.hasOwn(this.#register, registerKey)) {
      delete this.#register[registerKey];
    }
  }

  /**
   * The process of retrieving information that has already been registered based on a key.
   */
  get(key: string[]): RegisterItem | undefined {
    const registerKey = key.join("+");

    return this.#register?.[registerKey];
  }
}

export const KeyShortcut = new InternalKeyShortcut();
