import { GET_TOTAL_DOCTOR_CONVERSATIONS } from 'network/config/endpoints'
import api from 'network/config/api'

export const getDoctorsConversationService = async () => {
  const response = await api.apiGet(GET_TOTAL_DOCTOR_CONVERSATIONS)
  return response
}
