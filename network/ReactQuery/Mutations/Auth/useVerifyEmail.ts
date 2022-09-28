import { toast } from 'react-toastify'
import { verifyEmailService } from 'network/Services/Mutations/auth'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'

export const useVerifyEmail = () => {
  const [error, setError] = useState('')
  const verifyEmailMutation = useMutation(verifyEmailService, {
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      setError(errMsg)
      toast.error(errMsg)
    },
  })

  const {
    mutateAsync: verifyMailMutateAsync,
    isLoading: verifyMailLoading,
    isSuccess: verifyMailSuccess,
  } = verifyEmailMutation

  return {
    verifyMailMutateAsync,
    verifyMailLoading,
    verifyMailSuccess,
    verifyMailError: error,
  }
}
