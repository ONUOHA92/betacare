import {
  GET_PRESCRIPTIONS_COUNT,
  GET_ALL_PRESCRIRPTIONS,
} from 'network/config/endpoints'
import api from 'network/config/api'

export const getPrescriptionCountService = async () => {
  const response = await api.apiGet(GET_PRESCRIPTIONS_COUNT)
  return response
}

export const getPrescriptionsListService = async () => {
  const response = await api.apiGet(GET_ALL_PRESCRIRPTIONS)
  return response
}
