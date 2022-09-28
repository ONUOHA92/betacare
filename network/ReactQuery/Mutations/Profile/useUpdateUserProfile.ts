import { useState } from 'react'
import { updateUserProfileService } from 'network/Services/Mutations/profile'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useUpdateUserProfile = () => {
  const userProfileMutation = useMutation(updateUserProfileService, {
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
    mutate: updateProfile,
    isLoading: profileUpdateLoading,
    isSuccess: profileUpdateSuccess,
  } = userProfileMutation

  return {
    updateProfile,
    userProfileMutation,
    profileUpdateLoading,
    profileUpdateSuccess,
  }
}
