import { GET_ALL_PHARMACY_REQUESTS } from 'network/config/endpoints'
import api from 'network/config/api'

export const getPharmacyRequestService = async () => {
  const response = await api.apiGet(GET_ALL_PHARMACY_REQUESTS)
  return response
}
