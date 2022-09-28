import {
  GET_PATIENT_SIGNUP_LOGS_ENDPOINT,
  GET_DOCTOR_SIGNUP_LOGS_ENDPOINT,
  GET_RESGISTERED_DOCTOR_COUNT_ENDPOINT,
  GET_RESGISTERED_PATIENT_COUNT_ENDPOINT,
  GET_RESGISTERED_PHARMACY_COUNT_ENDPOINT,
  GET_RESGISTERED_LABORATORY_COUNT_ENDPOINT,
  GET_RESGISTERED_SUB_ADMIN_COUNT_ENDPOINT,
  GET_DOCTOR_DETAILS_ENDPOINT,
} from 'network/config/endpoints'
import api from 'network/config/api'

export const usePatientSignupService = () => {
  const getAllActivities = async (page: number) => {
    const response = await api.apiGet(
      `${GET_PATIENT_SIGNUP_LOGS_ENDPOINT}?page=${page}&size=10`
    )
    return response
  }
  return getAllActivities
}

export const useDoctorSignupService = () => {
  const getAllActivities = async (page: number) => {
    const response = await api.apiGet(
      `${GET_DOCTOR_SIGNUP_LOGS_ENDPOINT}?page=${page}&size=10`
    )
    return response
  }
  return getAllActivities
}

export const getRegisteredDoctorCountService = async () => {
  const response = await api.apiGet(`${GET_RESGISTERED_DOCTOR_COUNT_ENDPOINT}`)
  return response
}

export const getRegisteredPatientCountService = async () => {
  const response = await api.apiGet(`${GET_RESGISTERED_PATIENT_COUNT_ENDPOINT}`)
  return response
}

export const getRegisteredPharmacyCountService = async () => {
  const response = await api.apiGet(
    `${GET_RESGISTERED_PHARMACY_COUNT_ENDPOINT}`
  )
  return response
}

export const getRegisteredLaboratoryCountService = async () => {
  const response = await api.apiGet(
    `${GET_RESGISTERED_LABORATORY_COUNT_ENDPOINT}`
  )
  return response
}

export const getRegisteredSubAdminCountService = async () => {
  const response = await api.apiGet(
    `${GET_RESGISTERED_SUB_ADMIN_COUNT_ENDPOINT}`
  )
  return response
}

export const getDoctorDetailsService = async (id: number) => {
  const response = await api.apiGet(`${GET_DOCTOR_DETAILS_ENDPOINT}/${id}`)
  console.log('response', response)
  return response
}
