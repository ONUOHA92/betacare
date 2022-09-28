export function isBlank(value: string): boolean {
  const regexp = /^ *$/
  return regexp.test(value)
}

export function isBlankOrUndefined(value: string | undefined | null): boolean {
  if (value === undefined || value == null) {
    return true
  }
  return isBlank(value)
}
