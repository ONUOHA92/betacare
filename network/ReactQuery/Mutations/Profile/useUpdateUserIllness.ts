import { useState } from 'react'
import { updatePatientIllnessService } from 'network/Services/Mutations/profile'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useUpdateUserIllness = () => {
  const userProfileIllnessMutation = useMutation(updatePatientIllnessService, {
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
    isLoading: profileIllnessUpdateLoading,
    isSuccess: profileIllnessUpdateSuccess,
  } = userProfileIllnessMutation

  return {
    userProfileIllnessMutation,
    profileIllnessUpdateLoading,
    profileIllnessUpdateSuccess,
  }
}
