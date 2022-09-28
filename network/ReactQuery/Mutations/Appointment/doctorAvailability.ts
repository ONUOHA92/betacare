import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { setDoctorAvailabilityService } from 'network/Services/Mutations/appointment'

export const useSetDoctorAvailability = () => {
  const setDoctorAvailabilityMutation = useMutation(
    setDoctorAvailabilityService,
    {
      onSuccess: (data) => {
        // const { data: info }: any = data
        // console.log(data)
      },

      onError: (error: Record<any, any>) => {
        const errMsg = error?.response?.data?.message || ErrorMsgDefault
      },
    }
  )
  const {
    mutate: setDoctorAvailability,
    isLoading: setDoctorAvailabilityLoading,
    isSuccess: setDoctorAvailabilitySuccess,
    isError: setDoctorAvailabilityError,
  } = setDoctorAvailabilityMutation

  return {
    setDoctorAvailability,
    setDoctorAvailabilityMutation,
    setDoctorAvailabilityLoading,
    setDoctorAvailabilitySuccess,
    setDoctorAvailabilityError,
  }
}
