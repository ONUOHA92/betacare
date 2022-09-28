const capitalizeInitial = (string: string) => {
  if (typeof string === 'string') {
    const newStr = string.toLowerCase()
    return newStr.charAt(0).toUpperCase() + newStr.slice(1)
  }
  return string
}

export default capitalizeInitial
