import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { setDoctorAppointmentService } from 'network/Services/Mutations/appointment'
import { toast } from 'react-toastify'

export const useSetDoctorAppointmentStatus = () => {
  const setDoctorAppointmentStatusMutation = useMutation(
    setDoctorAppointmentService,
    {
      onSuccess: (data) => {
        const { data: info }: any = data
        console.log(info)
        toast.success(info?.message)
      },
      onError: (error: Record<any, any>) => {
        const errMsg = error?.response?.data?.message || ErrorMsgDefault
        toast.error(errMsg)
      },
    }
  )
  const {
    mutateAsync: setDoctorAppointmentStatus,
    isLoading: setDoctorAppointmentStatusLoading,
    isSuccess: setDoctorAppointmentStatusSuccess,
    isError: setDoctorAppointmentStatusError,
  } = setDoctorAppointmentStatusMutation

  return {
    setDoctorAppointmentStatus,
    setDoctorAppointmentStatusLoading,
    setDoctorAppointmentStatusSuccess,
    setDoctorAppointmentStatusError,
  }
}
