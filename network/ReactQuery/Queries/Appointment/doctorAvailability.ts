import { useQuery } from 'react-query'
import { GET_DOC_AVAILABILITY } from 'network/config/queryKeys'
import { getDocAvailabilityService } from 'network/Services/Queries/appointment'

export const useGetDocAvailability = () => {
  const getDocAvailability = useQuery<any, Error>(
    GET_DOC_AVAILABILITY,
    getDocAvailabilityService
    // {
    //   refetchOnWindowFocus: false,
    //   refetchOnMount: false,
    //   refetchOnReconnect: false,
    //   retry: false,
    //   refetchIntervalInBackground: false,
    // }
  )
  const { data, status, isSuccess, isError, refetch } = getDocAvailability
  return {
    docAvailability: data?.data,
    status,
    isSuccess,
    isError,
    refetch,
  }
}
