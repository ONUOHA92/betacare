import { useState } from 'react'
import { bookAppointmentService } from 'network/Services/Mutations/appointment'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'
import { toast } from 'react-toastify'

export const useBookAppointment = () => {
  const bookAppointmentMutation = useMutation(bookAppointmentService, {
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
    mutate: bookAppointment,
    isLoading: bookAppointmentLoading,
    isSuccess: bookAppointmentSuccess,
  } = bookAppointmentMutation

  return {
    bookAppointment,
    bookAppointmentMutation,
    bookAppointmentLoading,
    bookAppointmentSuccess,
  }
}
