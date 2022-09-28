import {
  getLabRequestService,
  getTotalLabAppointmentsService,
} from 'network/Services/Queries/labRequests'
import { useQuery } from 'react-query'
import {
  GET_LAB_REQUESTS,
  GET_TOTAL_LAB_APPOINTMENTS,
} from 'network/config/queryKeys'

export const useGetLabRequests = () => {
  const labRequestsQuery = useQuery<any, Error>(
    GET_LAB_REQUESTS,
    getLabRequestService
  )
  const { data, status, refetch } = labRequestsQuery

  return {
    labRequests: data?.data,
    status,
    refetchLabRequests: refetch,
  }
}

export const useGetTotalLabAppointments = () => {
  const labAppointmentsQuery = useQuery<any, Error>(
    GET_TOTAL_LAB_APPOINTMENTS,
    getTotalLabAppointmentsService
  )
  const { data, status, refetch } = labAppointmentsQuery

  return {
    labAppointments: data?.data,
    status,
    refetchLabAppointments: refetch,
  }
}
