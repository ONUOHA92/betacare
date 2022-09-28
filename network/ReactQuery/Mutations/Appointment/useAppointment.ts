import { useState } from 'react'
import { filterDocBySpecService } from 'network/Services/Mutations/appointment'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useFilterDocBySpec = () => {
  const [filterDocBySpecError, setFilterDocBySpecError] = useState('')

  const filterDocBySpecMutation = useMutation(filterDocBySpecService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success(info?.message)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setFilterDocBySpecError(errMsg)
    },
  })

  const {
    mutate: filterDocBySpec,
    isLoading: filterDocBySpecLoading,
    isSuccess: filterDocBySpecSuccess,
  } = filterDocBySpecMutation

  return {
    filterDocBySpec,
    filterDocBySpecMutation,
    filterDocBySpecLoading,
    filterDocBySpecSuccess,
    filterDocBySpecError,
  }
}
