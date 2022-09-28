import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { doctorSignupStatusService } from 'network/Services/Mutations/admin'
import { toast } from 'react-toastify'

export const useSetDoctorSignupStatus = () => {
  const setDoctorSignupStatusMutation = useMutation(doctorSignupStatusService, {
    onSuccess: (data: Record<any, any>) => {
      toast.success(data?.message)
    },

    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
    },
  })
  const {
    mutate: setDoctorSignupStatus,
    isLoading: setDoctorSignupStatusLoading,
    isSuccess: setDoctorSignupStatusSuccess,
    isError: setDoctorSignupStatusError,
  } = setDoctorSignupStatusMutation

  return {
    setDoctorSignupStatus,
    setDoctorSignupStatusLoading,
    setDoctorSignupStatusSuccess,
    setDoctorSignupStatusError,
  }
}
