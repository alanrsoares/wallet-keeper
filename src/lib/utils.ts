export const isNullable = (val: unknown): val is null | undefined =>
  val === null || val === undefined;

export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

export const formatPercentage = (value: number, decimals = 2) =>
  value.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });

export const maskAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
