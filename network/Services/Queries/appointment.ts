import {
  GET_DOCTOR_AVAILABILITY_ENDPOINT,
  GET_ALL_APPOINTMENT_ENDPOINT,
  GET_TOTAL_DOCTOR_APPOINTMENTS,
  GET_DOC_AVAILABILITY_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'
import { RequestResponse } from 'types'

export const getDoctorAvailabilityService = async (id: number) => {
  const response = await api.apiGet(`${GET_DOCTOR_AVAILABILITY_ENDPOINT}/${id}`)
  return response
}

export const allAppointmentService = () => {
  const getAllAppointments = async (page: number) => {
    const response = await api.apiGet(
      `${GET_ALL_APPOINTMENT_ENDPOINT}?page=${page}&size=10`
    )
    return response
  }
  return getAllAppointments
}

export const getDoctorsAppointmentCountService = async () => {
  const response = await api.apiGet(GET_TOTAL_DOCTOR_APPOINTMENTS)
  return response
}

export const getDocAvailabilityService = async () => {
  const response = await api.apiGet(`${GET_DOC_AVAILABILITY_ENDPOINT}`)
  return response
}
