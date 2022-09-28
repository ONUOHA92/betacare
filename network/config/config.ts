import { AxiosRequestConfig } from 'axios'

const baseURL = 'https://betacare-backend.herokuapp.com'

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
}
