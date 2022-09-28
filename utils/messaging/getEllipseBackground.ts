export const getBg = (status: string) => {
  if (status === 'online') {
    return '#0ED63A'
  } else if (status === 'away') {
    return '#FADB14'
  } else {
    return '#C4C4C4'
  }
}
