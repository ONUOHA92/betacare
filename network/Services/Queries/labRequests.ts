import {
  GET_LAB_REQUESTS,
  GET_TOTAL_LAB_APPOINTMENTS,
} from 'network/config/endpoints'
import api from 'network/config/api'

export const getLabRequestService = async () => {
  const response = await api.apiGet(GET_LAB_REQUESTS)
  return response
}

export const getTotalLabAppointmentsService = async () => {
  const response = await api.apiGet(GET_TOTAL_LAB_APPOINTMENTS)
  return response
}
