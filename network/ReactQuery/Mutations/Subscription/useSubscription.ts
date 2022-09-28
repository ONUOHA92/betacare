import { useState } from 'react'
import { subscriptionService } from 'network/Services/Mutations/subscription'
import { useMutation } from 'react-query'
import { ErrorMsgDefault, SUCCESS_MSG_ON_SUBSCRIPTION } from 'constants/constants'
import { subscriptionAtom } from '../../../../recoilStore/Atoms/subscriptionAtom'
import { useSetRecoilState } from 'recoil'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const useSubscription = () => {
  const currentRoute = useRouter()
  const setSubscription = useSetRecoilState(subscriptionAtom)
  const [subscriptionError, setSubscriptionError] = useState('')
  const subscriptionMutation = useMutation(subscriptionService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      setSubscription(info)
      toast.success(SUCCESS_MSG_ON_SUBSCRIPTION)
      setTimeout(() => {
        currentRoute.push(info?.message)
      }, 3000)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setSubscriptionError(errMsg)
    },
  })

  const {
    mutate: subscription,
    isLoading: subscriptionLoading,
    isSuccess: subscriptionSuccess,
  } = subscriptionMutation

  return {
    subscription,
    subscriptionLoading,
    subscriptionSuccess,
    subscriptionError,
  }
}
