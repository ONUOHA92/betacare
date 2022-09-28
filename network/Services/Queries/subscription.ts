import { GET_SUBSCRIPTION_ENDPOINT } from '../../config/endpoints'
import api from 'network/config/api'

export const getSubscriptionService = async () => {
  let response: any
  try {
    response = await api.apiGet(GET_SUBSCRIPTION_ENDPOINT)
  } catch (err) {
    console.log(err)
  }

  return response
}
