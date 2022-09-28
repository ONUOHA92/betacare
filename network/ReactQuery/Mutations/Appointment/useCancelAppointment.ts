import { cancelAppointmentService } from 'network/Services/Mutations/appointment'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useCancelAppointment = () => {
  const cancelAppointmentMutation = useMutation(cancelAppointmentService, {
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
    isLoading: cancelAppointmentLoading,
    isSuccess: cancelAppointmentSuccess,
  } = cancelAppointmentMutation

  return {
    cancelAppointmentMutation,
    cancelAppointmentLoading,
    cancelAppointmentSuccess,
  }
}
