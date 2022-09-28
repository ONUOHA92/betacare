import { IVerifyBankDetails, BankDetails } from '../../../interface/bank'
import {
  VERIFY_BANK_DETAILS,
  UPDATE_BANK_DETAILS_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const useVerifyBankDetailsService = async (
  payload: IVerifyBankDetails
) => {
  let response: any
  try {
    response = await api.post(VERIFY_BANK_DETAILS, payload)
  } catch (error) {
    console.log(error)
  }
  return response
}

export const useUpdateBankDetailsService = async (payload: BankDetails) => {
  let response: any
  try {
    response = await api.post(UPDATE_BANK_DETAILS_ENDPOINT, payload)
  } catch (error) {
    console.log(error)
  }
  return response
}
