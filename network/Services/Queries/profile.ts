import {
  GET_USER_PROFILE_ENDPOINT,
  GET_USER_MEDICAL_ENDPOINT,
  GET_MEDICAL_ILLNESS_ENDPOINT,
  GET_PATIENT_PERIOD_INFO_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const getUserProfileService = async () => {
  const response = await api.apiGet(GET_USER_PROFILE_ENDPOINT)
  return response
}

export const getUserMedicalProfileService = async () => {
  const response = await api.apiGet(GET_USER_MEDICAL_ENDPOINT)
  return response
}

export const getPatientIllnessService = async () => {
  const response = await api.apiGet(GET_MEDICAL_ILLNESS_ENDPOINT)
  return response
}

export const getNextPeriodDateService = async () => {
  const response = await api.apiGet(GET_PATIENT_PERIOD_INFO_ENDPOINT)
  return response
}
