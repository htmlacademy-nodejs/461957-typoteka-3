function transformDate(originalValue: unknown): Date {
  return new Date(Date.parse(originalValue as string));
}

export {transformDate};
