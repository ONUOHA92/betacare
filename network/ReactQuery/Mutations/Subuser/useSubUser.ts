import { useState } from 'react'
import {
  addSubUserService,
  removeSubUserService,
} from 'network/Services/Mutations/subuser'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useAddSubUser = () => {
  const [subUserError, setSubUserError] = useState('')

  const subUserMutation = useMutation(addSubUserService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success(info?.message)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setSubUserError(errMsg)
    },
  })

  const {
    mutate: addSubUser,
    isLoading: subUserLoading,
    isSuccess: subUserSuccess,
  } = subUserMutation

  return {
    addSubUser,
    subUserMutation,
    subUserLoading,
    subUserSuccess,
    subUserError,
  }
}

export const useRemoveSubUser = () => {
  const [subRemoveUserError, setSubRemoveUserError] = useState('')
  const removeSubuserMutation = useMutation(removeSubUserService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success(info?.message)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setSubRemoveUserError(errMsg)
    },
  })

  const {
    mutate: removeSubUser,
    isLoading: removeSubUserLoading,
    isSuccess: removeSubUserSuccess,
  } = removeSubuserMutation

  return {
    removeSubUser,
    removeSubuserMutation,
    removeSubUserLoading,
    removeSubUserSuccess,
    subRemoveUserError,
  }
}
