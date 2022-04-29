export const makeStringify = (value?: string[] | string) =>
  typeof value === 'string' ? value : value?.toString() || '';
