import { useState } from 'react'
import { subscriptionCancelService } from 'network/Services/Mutations/subscription'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { subscriptionCancelAtom } from '../../../../recoilStore/Atoms/subscriptionAtom'
import { useSetRecoilState } from 'recoil'
import { toast } from 'react-toastify'

export const useCancelSubscription = () => {
  const setSubscription = useSetRecoilState(subscriptionCancelAtom)
  const [subscriptionError, setSubscriptionError] = useState('')
  const subscriptionMutation = useMutation(subscriptionCancelService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success('Redirecting to dashboard...')
      setSubscription(info)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setSubscriptionError(errMsg)
    },
  })

  const {
    mutate: cancelSubscription,
    isLoading: subscriptionLoading,
    isSuccess: subscriptionSuccess,
  } = subscriptionMutation

  return {
    cancelSubscription,
    subscriptionLoading,
    subscriptionSuccess,
    subscriptionError,
  }
}
