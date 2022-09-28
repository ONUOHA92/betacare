import { GET_SUB_USER_ENDPOINT } from '../../config/endpoints'
import api from 'network/config/api'

export const getSubUserService = async () => {
  let response: any
  try {
    response = await api.apiGet(GET_SUB_USER_ENDPOINT)
  } catch (err) {
    console.log(err)
  }

  return response
}
