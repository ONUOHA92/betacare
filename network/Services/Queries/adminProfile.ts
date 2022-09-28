import { GET_ADMIN_PROFILE_ENDPOINT } from 'network/config/endpoints'
import api from 'network/config/api'

export const getAdminProfileService = async () => {
  const response = await api.apiGet(`${GET_ADMIN_PROFILE_ENDPOINT}`)
  return response
}
