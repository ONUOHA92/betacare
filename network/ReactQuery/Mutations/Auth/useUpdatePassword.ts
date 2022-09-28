import { useState } from 'react'
import { updatePasswordService } from '../../../Services/Mutations/auth'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from '../../../../constants/constants'
import { toast } from 'react-toastify'

export const useUpdatePassword = () => {
  const updatePasswordMutation = useMutation(updatePasswordService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success(info?.message)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
    },
  })

  const {
    mutate: updatePassword,
    isLoading: isUpdatingPassword,
    isSuccess: isSuccessPassword,
    isError: isErrorPassword,
  } = updatePasswordMutation
  return {
    updatePassword,
    updatePasswordMutation,
    isUpdatingPassword,
    isSuccessPassword,
    isErrorPassword,
  }
}
