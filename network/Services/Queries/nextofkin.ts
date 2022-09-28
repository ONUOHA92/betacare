import { GET_NEXT_OF_KIN_ENDPOINT } from '../../config/endpoints'
import api from 'network/config/api'

export const getNextOfKinService = async () => {
  let response: any
  try {
    response = await api.apiGet(GET_NEXT_OF_KIN_ENDPOINT)
  } catch (err) {
    console.log(err)
  }

  return response
}
