import React, { useState } from 'react'
import { getDoctorsRequestAppointmentServices } from 'network/Services/Queries/doctorsrequestappointment'
import { useQuery } from 'react-query'
import { GET_DOCTOR_REQUEST_APPOINTMENT_ALL } from 'network/config/queryKeys'

export const useGetDoctorRequestAppoint = () => {
  const [doctorsrequest, setDoctorRequest] = useState(null)
  const [doctorsrequestError, setDoctorsRequestError] = useState('')
  const { isLoading, refetch } = useQuery<any, Error>(
    GET_DOCTOR_REQUEST_APPOINTMENT_ALL,
    getDoctorsRequestAppointmentServices,
    {
      onSuccess: (data) => {
        console.log(data)
        setDoctorRequest(data)
      },
      onError: (error: any) => {
        console.log(error)
        setDoctorsRequestError(error?.request)
      },
    }
  )

  return {
    doctorsrequest,
    isLoading,
    doctorsrequestError,
    doctorsrequestRefetch: refetch
  }
}
