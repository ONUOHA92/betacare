import { useState } from 'react'
import { getSubscriptionService } from 'network/Services/Queries/subscription'
import { useQuery } from 'react-query'
import { getSubscriptionAtom } from '../../../../recoilStore/Atoms/subscriptionAtom'
import { useSetRecoilState } from 'recoil'
import { GET_SUBSCRIPTION } from 'network/config/queryKeys'

export const useGetSubscription = () => {
  const setSubscription = useSetRecoilState(getSubscriptionAtom)
  const subscriptionQuery = useQuery<any, Error>(
    GET_SUBSCRIPTION,
    getSubscriptionService
  )
  const { data, status: subscriptionStatus } = subscriptionQuery
  setSubscription(data?.data)
  return {
    currentSubscription: data?.data,
    subscriptionStatus,
  }
}
