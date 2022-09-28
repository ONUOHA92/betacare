import { getDoctorAvailabilityService } from 'network/Services/Queries/appointment'
import { useQuery } from 'react-query'
import { GET_DOCTOR_AVAILABILITY } from 'network/config/queryKeys'
import { useState } from 'react'

export const useDoctorAvailability = (id: number) => {
  const [doctorAvailability, setDoctorAvailability] = useState(null)
  const [doctorAvailabilityError, setDoctorAvailabilityError] = useState(null)
  const getDoctorAvailabilityQuery = useQuery<any, Error>(
    GET_DOCTOR_AVAILABILITY,
    () => getDoctorAvailabilityService(id),
    {
      onSuccess: (data: any) => {
        setDoctorAvailability(data?.data?.doctorAvailabilities)
      },
      onError: (error: any) => {
        setDoctorAvailabilityError(error?.request)
      },
      refetchOnMount: 'always',
    }
  )

  const { status, refetch, isFetching } = getDoctorAvailabilityQuery

  return {
    doctorAvailability,
    doctorAvailabilityFetching: isFetching,
    doctorAvailabilityError,
    status,
    refetchDoctorAvailability: refetch,
  }
}
