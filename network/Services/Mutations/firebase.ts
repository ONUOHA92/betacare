import {
  SET_FIREBASE_TOKEN_ENDPOINT,
  DELETE_FIREBASE_TOKEN_ENDPOINT,
} from 'network/config/endpoints'
import api from 'network/config/api'

export const setFirebaseTokenService = (token: string) => {
  return api.post(SET_FIREBASE_TOKEN_ENDPOINT, {
    token: token,
  })
}

export const deleteFirebaseTokenService = () => {
  return api.delete(DELETE_FIREBASE_TOKEN_ENDPOINT)
}
