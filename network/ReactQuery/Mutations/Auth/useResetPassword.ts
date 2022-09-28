import { resetPassword } from 'network/Services/Mutations/auth'
import router from 'next/router'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'

export const useResetPassword = () => {
  const [Error, setError] = useState('')

  const resetPasswordMutation = useMutation(resetPassword, {
    onSuccess: (data) => {
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    },
    onError: (error: Record<any, any>) => {
      setError(error?.response?.data?.message || ErrorMsgDefault)
      console.log(error?.response?.data?.message)
    },
  })

  const { mutate: _resetPassword, isLoading, isSuccess } = resetPasswordMutation

  return { isLoading, Error, _resetPassword, setError, isSuccess }
}
