import { useState } from 'react'
import {
  addNextOfKinService,
  updateNextOfKinService,
} from 'network/Services/Mutations/nextofkin'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'
import { UPDATE_NEXT_OF_KIN } from '../../../config/queryKeys'

export const useAddNextOfKin = () => {
  const [nextOfKinError, setNextOfKinError] = useState('')

  const nextOfKinMutation = useMutation(addNextOfKinService, {
    onSuccess: (data) => {
      const { data: info }: any = data
      toast.success(info?.message)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      toast.error(errMsg)
      setNextOfKinError(errMsg)
    },
  })

  const {
    mutate: addNextOfKin,
    isLoading: nextOfKinLoading,
    isSuccess: nextOfKinSuccess,
  } = nextOfKinMutation

  return {
    addNextOfKin,
    nextOfKinMutation,
    nextOfKinLoading,
    nextOfKinSuccess,
    nextOfKinError,
  }
}

export const useUpdateNextOfKin = () => {
  const [nextOfKinError, setNextOfKinError] = useState('')

  const updateNextOfKinMutation = useMutation(
    UPDATE_NEXT_OF_KIN,
    updateNextOfKinService,
    {
      onSuccess: (data) => {
        const { data: info }: any = data
        toast.success(info?.message)
      },
      onError: (error: Record<any, any>) => {
        const errMsg = error?.response?.data?.message || ErrorMsgDefault
        toast.error(errMsg)
        setNextOfKinError(errMsg)
      },
    }
  )

  const {
    mutate: updateNextOfKin,
    isLoading: updateNextOfKinLoading,
    isSuccess: updateNextOfKinSuccess,
    isError: updateNextOfKinError,
  } = updateNextOfKinMutation

  return {
    updateNextOfKin,
    updateNextOfKinMutation,
    updateNextOfKinLoading,
    updateNextOfKinSuccess,
    updateNextOfKinError,
  }
}
