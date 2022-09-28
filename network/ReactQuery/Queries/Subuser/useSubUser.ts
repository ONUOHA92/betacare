import { getSubUserService } from 'network/Services/Queries/subuser'
import { useQuery } from 'react-query'
import { GET_SUB_USER } from 'network/config/queryKeys'

export const useGetSubUser = () => {
  const subUserQuery = useQuery<any, Error>(GET_SUB_USER, getSubUserService, {
    refetchOnWindowFocus: false,
  })
  const { data, status, refetch } = subUserQuery
  return {
    subUsers: data?.data,
    status,
    refetchSubUsers: refetch,
  }
}
