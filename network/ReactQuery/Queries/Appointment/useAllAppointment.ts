import {
  allAppointmentService,
  getDoctorsAppointmentCountService,
} from 'network/Services/Queries/appointment'
import { useQuery } from 'react-query'
import {
  GET_DOCTOR_APPOINTMENT,
  GET_TOTAL_DOCTORS_APPOINTMENTS,
} from 'network/config/queryKeys'
import { useState } from 'react'

export const useAllDoctorAppointment = (page: number) => {
  const [allAppointment, setAllAppointment] = useState(null)
  const [allAppointmentError, setAllAppointmentError] = useState(null)
  const getAllAppointments = allAppointmentService()
  const getAllAppointmentQuery = useQuery<any, Error>(
    GET_DOCTOR_APPOINTMENT,
    () => getAllAppointments(page),
    {
      onSuccess: (data: any) => {
        setAllAppointment(data?.data)
      },
      onError: (error: any) => {
        setAllAppointmentError(error?.request)
      },
    }
  )

  const { status, refetch } = getAllAppointmentQuery

  return {
    getAllAppointments: allAppointment,
    status,
    getAllAppointmentQuery,
    allAppointmentError,
    refetchAllAppointments: refetch,
  }
}

export const useGetTotalDoctorsAppointment = () => {
  const totalAppointmentsQuery = useQuery<any, Error>(
    GET_TOTAL_DOCTORS_APPOINTMENTS,
    getDoctorsAppointmentCountService
  )
  const { data, status, refetch } = totalAppointmentsQuery

  return {
    doctorsAppointments: data?.data,
    status,
    refetchDoctorsAppointments: refetch,
  }
}
