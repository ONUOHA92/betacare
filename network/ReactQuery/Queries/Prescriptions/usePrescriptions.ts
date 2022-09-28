import {
  GET_TOTAL_PRESCRIPTIONS,
  GET_ALL_PRESCRIRPTIONS,
} from 'network/config/queryKeys'
import { useQuery } from 'react-query'
import {
  getPrescriptionCountService,
  getPrescriptionsListService,
} from 'network/Services/Queries/prescriptions'

export const useGetPrescriptionsCount = () => {
  const totalPrescriptionsQuery = useQuery<any, Error>(
    GET_TOTAL_PRESCRIPTIONS,
    getPrescriptionCountService
  )
  const { data, status, refetch } = totalPrescriptionsQuery

  return {
    totalPrescriptionsCount: data?.data,
    status,
    refetchTotalPrescriptionsCount: refetch,
  }
}

export const useGetAllPrescriptions = () => {
  const allPrescriptionsQuery = useQuery<any, Error>(
    GET_ALL_PRESCRIRPTIONS,
    getPrescriptionsListService
  )
  const { data, status, refetch } = allPrescriptionsQuery

  return {
    prescriptionsList: data?.data,
    status,
    refetchPrescriptionsList: refetch,
  }
}
