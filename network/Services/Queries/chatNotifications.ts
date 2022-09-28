import {
  OFFLINE_CHAT_MESSAGES_ENDPOINT,
  CLEAN_UP_NOTI_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const getChatNotificationService = async () => {
  const response = await api.apiGet(OFFLINE_CHAT_MESSAGES_ENDPOINT)
  return response
}

export const useCleanUpNotificationService = () => {
  const cleanNotifications = async (userId: string) => {
    const response = await api.patch(
      `${CLEAN_UP_NOTI_ENDPOINT}?userId=${userId}`,
      {}
    )
    return response
  }
  return cleanNotifications
}
