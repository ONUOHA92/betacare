import { GET_ADMIN_PROFILE } from 'network/config/queryKeys'
import { getAdminProfileService } from 'network/Services/Queries/adminProfile'
import { useQuery } from 'react-query'

export const useAdminProfile = () => {
  const getProfileQuery = useQuery<any, Error>(
    GET_ADMIN_PROFILE,
    getAdminProfileService
  )

  const { data, status, refetch } = getProfileQuery

  return {
    adminProfile: data?.data,
    status,
    refetchAdminProfile: refetch,
  }
}
