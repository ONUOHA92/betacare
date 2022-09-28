import { getPharmacyRequestService } from 'network/Services/Queries/pharmacyRequests'
import { useQuery } from 'react-query'
import { GET_PHARMACY_REQUESTS } from 'network/config/queryKeys'

export const useGetAllPharmacyRequests = () => {
  const pharmacyRequestListQuery = useQuery<any, Error>(
    GET_PHARMACY_REQUESTS,
    getPharmacyRequestService
  )
  const { data, status, refetch } = pharmacyRequestListQuery

  return {
    pharmacyRequests: data?.data,
    status,
    refetchPharmacyRequests: refetch,
  }
}
