import { ISubscription } from '../../../interface/subscription'
import {
  SET_SUBSCRIPTION_ENDPOINT,
  CANCEL_SUBSCRIPTION_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const subscriptionService = async (payload: ISubscription) => {
  const response = api.post(SET_SUBSCRIPTION_ENDPOINT, payload)
  return response
}

export const subscriptionCancelService = async () => {
  const response = api.post(CANCEL_SUBSCRIPTION_ENDPOINT, {})
  return response
}
