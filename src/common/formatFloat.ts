import { isUndefined } from "@mjt-engine/object";

export const formatFloat = (value: number, decimals: number = 2) => {
  if (isUndefined(value)) {
    return "";
  }
  return value.toFixed(decimals);
};
