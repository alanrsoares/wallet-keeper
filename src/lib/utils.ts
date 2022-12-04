import { getAddress } from "ethers/lib/utils";

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

export const isValidBIP32Address = (address: string) => {
  try {
    return getAddress(address) === address;
  } catch (error) {
    return false;
  }
};

export const sanitizeWalletName = (name: string) =>
  name.replace(/[^a-zA-Z0-9]/g, "");

export const debounce = <FN extends (...args: any[]) => unknown>(
  fn: FN,
  ms: number
) => {
  let timeoutId: number;
  return ((...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(fn.bind(null, ...args), ms);
  }) as FN;
};
