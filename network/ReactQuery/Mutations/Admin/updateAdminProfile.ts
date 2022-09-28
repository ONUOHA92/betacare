import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { updateAdminProfileService } from 'network/Services/Mutations/profile'
import { useState } from 'react'

export const useUpdateAdminProfile = () => {
  const [updateAdminProfileError, setUpdateAdminProfileError] = useState('')
  const updateAdminProfileMutation = useMutation(updateAdminProfileService, {
    onSuccess: (data) => {
      const { data: IUpdateProfileResponse }: any = data
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
    },
  })

  const {
    mutate: updateAdminProfile,
    isLoading: isUpdatingAdminProfile,
    isSuccess,
    isError,
  } = updateAdminProfileMutation
  return {
    updateAdminProfile,
    isUpdatingAdminProfile,
    isSuccess,
    isError,
  }
}
