import { GET_ALL_BANKS, GET_BANK_DETAILS } from '../../config/endpoints'
import api from 'network/config/api'

export const getAllBanksServiceFetcher = async () => {
  let response: any
  try {
    response = await api.apiGet(GET_ALL_BANKS)
  } catch (error) {
    console.log(error)
  }
  return response
}

export const getBankDetailsServiceFetcher = async () => {
  let response: any
  try {
    response = await api.apiGet(GET_BANK_DETAILS)
  } catch (error) {
    console.log(error)
  }
  return response
}
