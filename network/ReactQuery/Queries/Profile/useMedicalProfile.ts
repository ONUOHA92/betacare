import { getUserMedicalProfileService } from 'network/Services/Queries/profile'
import { useQuery } from 'react-query'
import { GET_USER_MEDICAL_PROFILE } from 'network/config/queryKeys'

export const useMedicalProfile = () => {
  const getProfileQuery = useQuery<any, Error>(
    GET_USER_MEDICAL_PROFILE,
    getUserMedicalProfileService
  )

  const { data, status, refetch } = getProfileQuery

  return {
    userMedicalProfile: data?.data,
    status,
    refetchUserMedicalProfile: refetch,
  }
}
