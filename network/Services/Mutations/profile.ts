import {
  IProfileUpdate,
  IProfileMedical,
  IProfileIllness,
  IPeriodTracker,
} from '../../../interface/profile'
import { IUpdateDoctorProfile } from '../../../interface/doctor'
import {
  UPDATE_USER_PROFILE_ENDPOINT,
  UPDATE_USER_MEDICAL_ENDPOINT,
  SET_MEDICAL_ILLNESS_ENDPOINT,
  SET_PATIENT_PERIOD_INFO_ENDPOINT,
  UPDATE_DOCTOR_PROFILE_ENDPOINT,
  UPDATE_ADMIN_PROFILE_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'
import { IUpdateAdminProfile } from 'interface/admin'

export const updateUserProfileService = async (payload: IProfileUpdate) => {
  const response = api.post(UPDATE_USER_PROFILE_ENDPOINT, payload)
  return response
}

export const updateUserMedicalService = async (payload: IProfileMedical) => {
  const response = api.post(UPDATE_USER_MEDICAL_ENDPOINT, payload)
  return response
}

export const updatePatientIllnessService = async (payload: IProfileIllness) => {
  const response = api.post(SET_MEDICAL_ILLNESS_ENDPOINT, payload)
  return response
}

export const updateUserPeriodTrackerService = async (
  payload: IPeriodTracker
) => {
  const response = api.post(SET_PATIENT_PERIOD_INFO_ENDPOINT, payload)
  return response
}

export const updateDoctorProfileService = async (
  payload: IUpdateDoctorProfile
) => {
  const response = api.post(UPDATE_DOCTOR_PROFILE_ENDPOINT, payload)
  return response
}

export const updateAdminProfileService = async (
  payload: IUpdateAdminProfile
) => {
  const response = api.post(UPDATE_ADMIN_PROFILE_ENDPOINT, payload)
  return response
}
