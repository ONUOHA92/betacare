import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { USER_TOKEN } from 'network/config/queryKeys'
import { getWithExpiry } from 'utils/localStorage'

const initializeAxios = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create(config)

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getWithExpiry(USER_TOKEN)}`

    return config
  })

  return axiosInstance
}

export default initializeAxios
