import { getUserProfileService } from 'network/Services/Queries/profile'
import { useQuery } from 'react-query'
import { GET_USER_PROFILE } from 'network/config/queryKeys'

export const useProfile = () => {
  const getProfileQuery = useQuery<any, Error>(
    GET_USER_PROFILE,
    getUserProfileService,
  
  )

  const { data, status, refetch } = getProfileQuery

  return {
    userProfile: data?.data,
    status,
    refetchUserProfile: refetch,
  }
}
