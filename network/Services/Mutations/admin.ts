import { SET_DOCTOR_SIGNUP_STATUS_ENDPOINT } from 'network/config/endpoints'
import api from 'network/config/api'
import { IDoctorSignupStatus } from 'interface/doctorsignupstatus'

export const doctorSignupStatusService = async (
  payload: IDoctorSignupStatus
) => {
  const response = await api.post(SET_DOCTOR_SIGNUP_STATUS_ENDPOINT, payload)
  return response.data
}
