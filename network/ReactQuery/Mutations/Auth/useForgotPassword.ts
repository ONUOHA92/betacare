import { forgotPassword } from 'network/Services/Mutations/auth'
import router from 'next/router'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'

export const useForgotPassword = (email: string) => {
  const [Error, setError] = useState('')
  const forgotPasswordMutation = useMutation(forgotPassword, {
    onSuccess: (data) => {
      router.push(`/forgotpassword/${email}`)
    },
    onError: (error: Record<any, any>) => {
      setError(error?.response?.data?.message || ErrorMsgDefault)
      console.log(error?.response?.data?.message)
    },
  })

  const { mutate: resetPassword, isLoading } = forgotPasswordMutation

  return { isLoading, Error, resetPassword, setError }
}
