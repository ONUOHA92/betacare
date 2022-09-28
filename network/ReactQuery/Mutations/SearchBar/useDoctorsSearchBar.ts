import { searchForDoctorsService } from 'network/Services/Mutations/searchBar'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useSearchForDoctors = () => {
  const searchForDoctorsMutation = useMutation(searchForDoctorsService, {
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
    mutate: searchData,
    isLoading: searchDataLoading,
    isSuccess: searchDataSuccess,
  } = searchForDoctorsMutation

  return {
    searchData,
    searchForDoctorsMutation,
    searchDataLoading,
    searchDataSuccess,
  }
}
