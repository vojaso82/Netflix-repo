export const isNil = (val) => {
  if (val == null) {
    return true;
  }
  if (typeof val === "string") {
    return val === "";
  }
  if (typeof val === "number") {
    return val === 0;
  }
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  return false;
};

export const isNotNil = (val) => !isNil(val);
