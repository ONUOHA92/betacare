import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { updateDoctorProfileService } from 'network/Services/Mutations/profile'
import { toast } from 'react-toastify'
import { useState } from 'react'

export const useUpdateDoctorProfile = () => {
  const [updateDoctorProfileError, setUpdateDoctorProfileError] = useState('')
  const updateDoctorProfileMutation = useMutation(updateDoctorProfileService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success(info?.message)
      console.log(data, 'data')
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
    },
  })

  const {
    mutate: updateDoctorProfile,
    isLoading: isUpdatingDoctorProfile,
    isSuccess,
    isError,
  } = updateDoctorProfileMutation
  return {
    updateDoctorProfile,
    isUpdatingDoctorProfile,
    isSuccess,
    isError,
  }
}
