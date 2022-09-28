import { GET_USERS_DOCTOR, GET_USERS_PATIENT } from '../../config/endpoints'
import api from 'network/config/api'
import { PATIENT_ROLE } from 'constants/constants'

export const useChatUserService = () => {
  const getAllUsers = async (userType: string) => {
    const users_endpoint =
      userType === PATIENT_ROLE ? GET_USERS_DOCTOR : GET_USERS_PATIENT
    const response = await api.apiGet(`${users_endpoint}?size=50`)
    return response
  }
  return getAllUsers
}
