import { useState } from 'react'
import { useMutation } from 'react-query'
import {
  useVerifyBankDetailsService,
  useUpdateBankDetailsService,
} from 'network/Services/Mutations/bank'
import { VERIFY_BANK_DETAILS } from '../../../config/queryKeys'
import { ErrorMsgDefault } from 'constants/constants'

export const useVerifyBankDetails = () => {
  const verifyBankDetailsMutation = useMutation(
    VERIFY_BANK_DETAILS,
    useVerifyBankDetailsService,
    {
      onSuccess: (data) => {
        // const { data: info }: any = data
        // console.log(data)
      },
      onError: (error: Record<any, any>) => {
        console.log(error)
        const errMsg = error?.response?.data?.message || ErrorMsgDefault
      },
    }
  )

  const {
    mutate: verifyBankDetails,
    isLoading: verifyBankDetailsLoading,
    isSuccess: verifyBankDetailsSuccess,
    isError: verifyBankDetailsError,
    data,
  } = verifyBankDetailsMutation

  return {
    verifyBankDetails,
    verifyBankDetailsMutation,
    verifyBankDetailsLoading,
    verifyBankDetailsSuccess,
    verifyBankDetailsError,
    accountDetails: data?.data,
  }
}

export const useUpdateBankDetails = () => {
  const [updateBankDetailsError, setUpdateBankDetailsError] = useState('')
  const updateBankMutation = useMutation(useUpdateBankDetailsService, {
    onSuccess: (data) => {
      // const { data: info }: any = data
      // console.log(data)
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      setUpdateBankDetailsError(errMsg)
    },
  })

  const {
    mutate: updateBankDetails,
    isLoading: updateBankDetailsLoading,
    isSuccess: updateBankDetailsSuccess,
  } = updateBankMutation

  return {
    updateBankDetails,
    updateBankDetailsLoading,
    updateBankDetailsSuccess,
    updateBankDetailsError,
  }
}
