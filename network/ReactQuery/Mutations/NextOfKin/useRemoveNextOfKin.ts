import { useState } from 'react'
import { removeNextOfKinService } from 'network/Services/Mutations/nextofkin'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useRemoveNextOfKin = () => {
  const [nextOfKinRemoveError, setNextOfKinRemoveError] = useState('')
  const nextOfKinRemoveMutation = useMutation(removeNextOfKinService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success(info?.message)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setNextOfKinRemoveError(errMsg)
    },
  })

  const {
    mutate: removeSubUser,
    isLoading: removeNextOfKinLoading,
    isSuccess: removeNextOfKinSuccess,
  } = nextOfKinRemoveMutation

  return {
    removeSubUser,
    nextOfKinRemoveMutation,
    removeNextOfKinLoading,
    removeNextOfKinSuccess,
    nextOfKinRemoveError,
  }
}
