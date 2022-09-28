import {
  GET_USER_ACTIVITY_ENDPOINT,
  GET_DOCTOR_ACTIVITY_ENDPOINT,
  GET_ADMIN_ACTIVITY_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const useActivityService = () => {
  const getAllActivities = async (page: number) => {
    const response = await api.apiGet(
      `${GET_USER_ACTIVITY_ENDPOINT}?page=${page}&size=100`
    )
    return response
  }
  return getAllActivities
}

export const useDoctorActivityService = () => {
  const getAllActivities = async (page: number) => {
    const response = await api.apiGet(
      `${GET_DOCTOR_ACTIVITY_ENDPOINT}?page=${page}&size=100`
    )
    return response
  }
  return getAllActivities
}

export const useAdminActivityService = () => {
  const getAllActivities = async (page: number) => {
    const response = await api.apiGet(
      `${GET_ADMIN_ACTIVITY_ENDPOINT}?page=${page}&size=100`
    )
    return response
  }
  return getAllActivities
}
