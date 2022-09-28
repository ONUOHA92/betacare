import { updateUserMedicalService } from 'network/Services/Mutations/profile'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useUpdateUserMedical = () => {
  const userMedicalMutation = useMutation(updateUserMedicalService, {
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
    mutate: updateMedicalProfile,
    isLoading: medicalUpdateLoading,
    isSuccess: medicalUpdateSuccess,
  } = userMedicalMutation

  return {
    updateMedicalProfile,
    userMedicalMutation,
    medicalUpdateLoading,
    medicalUpdateSuccess,
  }
}
