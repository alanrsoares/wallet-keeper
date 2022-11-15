export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === "object";
};

export const isNullable = (val: unknown): val is null | undefined => {
  return val === null || val === undefined;
};
