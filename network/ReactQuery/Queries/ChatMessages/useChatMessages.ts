import { useChatMessageService } from 'network/Services/Queries/chatMessages'
import { useQuery } from 'react-query'
import { GET_CHAT_MESSAGES } from 'network/config/queryKeys'
import { useState } from 'react'
import { ErrorMsgDefault } from 'constants/constants'

export const useChatMessages = (userId: string) => {
  const getChatMsgs = useChatMessageService()
  const [error, setError] = useState('')
  const getChatMessagesQuery = useQuery<any, Error>(
    GET_CHAT_MESSAGES,
    () => getChatMsgs(userId),
    {
      onError: (error: Record<any, any>) => {
        const err = error?.response?.data?.message || ErrorMsgDefault
        setError(err)
      },
    }
  )
  const { data, status, refetch } = getChatMessagesQuery
  return {
    chatMessages: data?.data?.content,
    status,
    refetchChatMessages: refetch,
    errorChatMessage: error,
  }
}
