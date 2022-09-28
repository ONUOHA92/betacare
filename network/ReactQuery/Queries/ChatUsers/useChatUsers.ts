import { useChatUserService } from 'network/Services/Queries/chatUsers'
import { useQuery } from 'react-query'
import { GET_CHAT_USERS } from 'network/config/queryKeys'
import { useState } from 'react'
import { ErrorMsgDefault } from 'constants/constants'

export const useChatUsers = (userType: string) => {
  const getChatUsers = useChatUserService()
  const [error, setError] = useState('')
  const getChatUserQuery = useQuery<any, Error>(
    GET_CHAT_USERS,
    () => getChatUsers(userType),
    {
      onError: (error: Record<any, any>) => {
        const err = error?.response?.data?.message || ErrorMsgDefault
        setError(err)
      },
    }
  )
  const { data, status, refetch } = getChatUserQuery
  return {
    chatUsers: data?.data?.content,
    status,
    refetchChatUsers: refetch,
    errorChatUser: error,
  }
}
