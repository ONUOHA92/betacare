import axios from 'axios'
import initializeAxios from './axiosSetup'
import { axiosRequestConfiguration } from './config'

export const baseUrl = 'https://betacare-backend.herokuapp.com'

const axiosInstance = initializeAxios(axiosRequestConfiguration)

const get = <T>(url: string, queryParams?: object) => {
  return axiosInstance.get<T>(baseUrl + url, { params: queryParams })
}

const post = <T>(url: string, body: object, queryParams?: object) => {
  return axiosInstance.post<T>(baseUrl + url, body, { params: queryParams })
}

const getSpecific = <T>(url: string, queryParams?: object) => {
  return axiosInstance.get<T>(baseUrl + url, { params: queryParams })
}

const put = <T>(url: string, body: object, queryParams?: object) => {
  return axiosInstance.put<T>(baseUrl + url, body, { params: queryParams })
}

const patch = <T>(url: string, body: object, queryParams?: object) => {
  return axiosInstance.patch<T>(baseUrl + url, body, { params: queryParams })
}

const apiDelete = <T>(url: string, id?: number) => {
  if (!id) {
    return axiosInstance.delete<T>(`${baseUrl + url}`)
  } else {
    return axiosInstance.delete<T>(`${baseUrl + url}/${id}`)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, post, put, patch, delete: apiDelete, apiGet: getSpecific }
