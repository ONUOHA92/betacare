export const headerGenerator = (
  token: string
): {
  headers: {
    Authorization: string
  }
} => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  }
}
