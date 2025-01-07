const JOINT_CHARACTER = "+";

export const keysToString = (keys: string[]) => {
  return keys.sort().join(JOINT_CHARACTER);
};

export const stringToKeys = (key: string) => {
  return key.split(JOINT_CHARACTER);
};
