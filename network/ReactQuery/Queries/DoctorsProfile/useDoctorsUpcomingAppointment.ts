import React, { useState } from 'react'
import { getDoctorsUppcomingAppointmentService } from 'network/Services/Queries/doctorsupcomingappoint'
import { useQuery } from 'react-query'
import { GET_DOCTOR_UP_COMING_APPOINTMENT } from 'network/config/queryKeys'

export const useGetDoctorAppointment = () => {
  const [doctorsupAppointment, setDoctorsAppoint] = useState(null)
  const [doctorsupAppointmentError, setDoctorsAppointmentError] = useState('')
  const { isLoading } = useQuery<any, Error>(
    GET_DOCTOR_UP_COMING_APPOINTMENT,
    getDoctorsUppcomingAppointmentService,
    {
      onSuccess: (data) => {
        console.log(data)
        setDoctorsAppoint(data)
      },
      onError: (error: any) => {
        console.log(error)
        setDoctorsAppointmentError(error?.request)
      },
    }
  )

  return {
    doctorsupAppointment,
    isLoading,
    doctorsupAppointmentError,
  }
}
