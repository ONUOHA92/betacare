export const toFullName = (data: { firstName: string; lastName: string }) =>
  [data.firstName, data.lastName].filter((val) => val).join(' ')
