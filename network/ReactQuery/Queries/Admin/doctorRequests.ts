import {
  GET_DOCTOR_SIGNUP_LOGS,
  GET_DOCTOR_DETAILS,
} from 'network/config/queryKeys'
import {
  useDoctorSignupService,
  getDoctorDetailsService,
} from 'network/Services/Queries/admin'
import { useQuery } from 'react-query'
import { useState } from 'react'

export const useGetDoctorSignupLogs = (page: number) => {
  const [doctorSignupLogs, setDoctorSignupLogs] = useState(null)
  const [doctorSignupLogsError, setDoctorSignupLogsError] = useState(null)
  const getDoctorSignupLogs = useDoctorSignupService()
  const getDoctorSignupLogsQuery = useQuery<any, Error>(
    GET_DOCTOR_SIGNUP_LOGS,
    () => getDoctorSignupLogs(page),
    {
      onSuccess: (data: any) => {
        setDoctorSignupLogs(data?.data)
      },
      onError: (error: any) => {
        setDoctorSignupLogsError(error?.request)
      },
    }
  )
  const { status, refetch } = getDoctorSignupLogsQuery
  return {
    doctorSignupLogs,
    doctorSignupLogsError,
    status,
    refetchDoctorSignupLogs: refetch,
  }
}

export const useGetDoctorDetails = (id: number) => {
  const getDoctorDetailsQuery = useQuery<any, Error>(GET_DOCTOR_DETAILS, () =>
    getDoctorDetailsService(id)
  )
  const { status, refetch, data } = getDoctorDetailsQuery
  return {
    doctorDetails: data?.data,
    status,
    refetchDoctorDetails: refetch,
  }
}
