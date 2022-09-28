import { GET_DOCTORS_PROFILE, GET_ALL_DOCTORS } from '../../config/endpoints'
import api from 'network/config/api'

export const getDoctorsProfileService = async () => {
  const response = await api.apiGet(GET_DOCTORS_PROFILE)
  return response
}

export const useDoctorInHouseService = () => {
  const getAllInHouseDoctors = async (page: number) => {
    const response = await api.apiGet(`${GET_ALL_DOCTORS}?page=${page}&size=10`)
    return response
  }
  return getAllInHouseDoctors
}

export const getSingleDoctorProfileService = async (id: number) => {
  const response = await api.apiGet(`${GET_DOCTORS_PROFILE}/${id}`)
  return response
}
