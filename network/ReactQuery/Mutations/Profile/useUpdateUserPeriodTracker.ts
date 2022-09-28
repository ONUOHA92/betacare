import { updateUserPeriodTrackerService } from 'network/Services/Mutations/profile'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useUpdateUserPeriodTracker = () => {
  const userPeriodTrackerMutation = useMutation(
    updateUserPeriodTrackerService,
    {
      onSuccess: (data) => {
        const { data: info }: any = data
        toast.success(info?.message)
      },
      onError: (error: Record<any, any>) => {
        const errMsg = error?.response?.data?.message || ErrorMsgDefault
        toast.error(errMsg)
      },
    }
  )

  const {
    isLoading: periodTrackerMutationLoading,
    isSuccess: periodTrackerMutationSuccess,
  } = userPeriodTrackerMutation

  return {
    userPeriodTrackerMutation,
    periodTrackerMutationLoading,
    periodTrackerMutationSuccess,
  }
}
