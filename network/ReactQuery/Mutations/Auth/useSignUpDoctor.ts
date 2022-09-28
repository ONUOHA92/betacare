import data from 'containers/TopBar/data'
import { signUpServiceDoctor } from 'network/Services/Mutations/auth'
import router from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'

export const useSignUpDoctor = () => {
  const [error, setError] = useState('')

  const signUpMutation = useMutation(signUpServiceDoctor, {
    onSuccess: (data) => {
      const { data: info }: any = data;
      toast.success(info?.message)
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setError(errMsg)
    },
  })

  const { mutate: signUp, isLoading: isSigningUp, isSuccess } = signUpMutation

  return { signUp, setError, isSigningUp, isSuccess, error }
}
