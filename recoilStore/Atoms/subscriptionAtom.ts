import { atom } from 'recoil'
import { subscription, getSubscription } from '../initialState/subscription'
import {
  SET_SUBSCRIPTION,
  GET_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION,
} from 'network/config/queryKeys'

export const subscriptionAtom = atom({
  key: SET_SUBSCRIPTION,
  default: { ...subscription },
})

export const getSubscriptionAtom = atom({
  key: GET_SUBSCRIPTION,
  default: { ...getSubscription },
})

export const subscriptionCancelAtom = atom({
  key: CANCEL_SUBSCRIPTION,
})
