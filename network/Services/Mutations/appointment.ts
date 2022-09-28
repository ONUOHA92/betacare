import {
  IFilterDoctorBySpec,
  IBookAppointment,
  ICancelAppointment,
  IDoctorAvailabilityUpdate,
  IDoctorAppointmentUpdate,
} from '../../../interface/appointment'
import {
  FILTER_DOCTOR_BY_SPEC_ENDPOINT,
  BOOK_APPOINTMENT_ENDPOINT,
  CANCEL_APPOINTMENT_ENDPOINT,
  SET_DOCTOR_AVAILABILITY_ENDPOINT,
  DELETE_DOCTOR_AVILABILITY_ENDPOINT,
  SET_DOCTOR_APPOINTMENT_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const filterDocBySpecService = async (payload: IFilterDoctorBySpec) => {
  const response = api.post(FILTER_DOCTOR_BY_SPEC_ENDPOINT, payload)
  return response
}

export const bookAppointmentService = async (payload: IBookAppointment) => {
  const response = api.post(BOOK_APPOINTMENT_ENDPOINT, payload)
  return response
}

export const cancelAppointmentService = async (payload: ICancelAppointment) => {
  const response = api.post(CANCEL_APPOINTMENT_ENDPOINT, payload)
  return response
}

export const setDoctorAvailabilityService = async (
  payload: IDoctorAvailabilityUpdate
) => {
  const response = api.post(SET_DOCTOR_AVAILABILITY_ENDPOINT, payload)
  return response
}

export const setDoctorAppointmentService = async (
  payload: IDoctorAppointmentUpdate
) => {
  const response = api.post(SET_DOCTOR_APPOINTMENT_ENDPOINT, payload)
  return response
}


export const removeDoctorsAvailibily = async (id: number) => {
  const response = api.delete(`${DELETE_DOCTOR_AVILABILITY_ENDPOINT}=${id}`)
  return response
}

