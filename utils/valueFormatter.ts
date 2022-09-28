export const valueFormatter = (value: number | string) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
