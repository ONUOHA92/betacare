import { CHAT_MESSAGES_ENDPOINT } from '../../config/endpoints'
import api from 'network/config/api'

export const useChatMessageService = () => {
  const getChatMessages = async (userId: string) => {
    const response = await api.apiGet(
      `${CHAT_MESSAGES_ENDPOINT}?userId=${userId}`,
      {
        size: 100,
      }
    )
    return response
  }
  return getChatMessages
}
