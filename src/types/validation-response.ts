type ValidationResponse<T> = Partial<Record<keyof T, string>>;

export {
  ValidationResponse,
};
