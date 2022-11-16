export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === "object";
};

export const isNullable = (val: unknown): val is null | undefined => {
  return val === null || val === undefined;
};

export const isFunction = (val: unknown): val is Function => {
  return typeof val === "function";
};

export const formatPercentage = (value: number, decimals = 2) => {
  return value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
};
