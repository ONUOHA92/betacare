import { useQuery } from 'react-query'
import {
  getAllBanksServiceFetcher,
  getBankDetailsServiceFetcher,
} from 'network/Services/Queries/bank'
import { GET_ALL_BANKS, GET_BANK_DETAILS } from '../../../config/endpoints'

export const useGetBanks = () => {
  const getBanksQuery = useQuery<any, Error>(
    [GET_ALL_BANKS],
    getAllBanksServiceFetcher,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchIntervalInBackground: false,
      staleTime: Infinity,
    }
  )
  const { data, status, isSuccess, refetch } = getBanksQuery

  return {
    banks: data?.data?.bankNames,
    status,
    isSuccess,
    refetch,
  }
}

export const useGetBankDetails = () => {
  const getBankDetailsQuery = useQuery<any, Error>(
    [GET_BANK_DETAILS],
    getBankDetailsServiceFetcher,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchIntervalInBackground: false,
      staleTime: Infinity,
    }
  )
  const { data, status, refetch, isSuccess } = getBankDetailsQuery

  return {
    bankDetails: data?.data,
    status,
    refetchBankDetails: refetch,
    isSuccess,
  }
}
