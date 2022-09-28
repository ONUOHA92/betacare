import { getNextPeriodDateService } from 'network/Services/Queries/profile'
import { useQuery } from 'react-query'
import { GET_NEXT_PERIOD_DATE } from 'network/config/queryKeys'

export const useNextPeriod = () => {
  const getNextPeriodDate = useQuery<any, Error>(
    GET_NEXT_PERIOD_DATE,
    getNextPeriodDateService
  )
  const { data, status, refetch } = getNextPeriodDate
  return {
    nextPeriodDate: data?.data,
    status,
    refetchNextPeriodDate: refetch,
  }
}
