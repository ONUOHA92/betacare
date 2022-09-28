import { getNextOfKinService } from 'network/Services/Queries/nextofkin'
import { useQuery } from 'react-query'
import { GET_NEXT_OF_KIN } from 'network/config/queryKeys'
import { useState } from 'react'

export const useGetNextOfKin = () => {
  const [subUser, setSubUser] = useState(null)
  const [getSubUserError, setGetSubUserError] = useState(null)
  const nextOfKinQuery = useQuery<any, Error>(
    GET_NEXT_OF_KIN,
    getNextOfKinService,
    {
      onSuccess: (data: any) => {
        setSubUser(data?.data)
      },
      onError: (error: any) => {
        setGetSubUserError(error?.request)
      },
    }
  )

  const { status, refetch } = nextOfKinQuery

  return {
    nextOfKin: subUser,
    getSubUserError,
    status,
    refetchNextOfKin: refetch,
  }
}
