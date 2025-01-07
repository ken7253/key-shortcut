type RegisterItem = {
  action: () => void;
};

type Register = Record<string, RegisterItem> | null;

export class KeyShortcut {
  #register: Register = null;

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

  remove(key: string[]) {
    const registerKey = key.join("+");

    if (this.#register == null) return;

    if (Object.hasOwn(this.#register, registerKey)) {
      delete this.#register[registerKey];
    }
  }

  get(key: string[]): RegisterItem | undefined {
    const registerKey = key.join("+");

    return this.#register?.[registerKey];
  }
}
