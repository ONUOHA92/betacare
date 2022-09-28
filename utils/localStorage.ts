import moment from 'moment'
import jwt from 'jsonwebtoken'

export const setWithExpiry = (key, value, ttl) => {
  const now = new Date()
  const item = {
    value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const token = JSON.parse(itemStr).value
  const decodedToken = jwt.decode(token, { complete: true })
  const tokenExpiry = decodedToken?.payload?.exp
  const currentUnixTime = moment().unix()

  if (currentUnixTime > tokenExpiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

export const setWithOutExpiry = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getWithOutExpiry = (key) => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  return item
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}
