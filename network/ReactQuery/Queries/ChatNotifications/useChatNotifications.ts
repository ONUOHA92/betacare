import {
  getChatNotificationService,
  useCleanUpNotificationService,
} from 'network/Services/Queries/chatNotifications'
import { useQuery } from 'react-query'
import {
  GET_CHAT_NOTIFICATIONS,
  CLEAN_UP_CHAT_NOTIFICATIONS,
} from 'network/config/queryKeys'
import { useState } from 'react'
import { ErrorMsgDefault } from 'constants/constants'

export const useChatNotifications = () => {
  const [error, setError] = useState('')
  const getChatNotificationsQuery = useQuery<any, Error>(
    GET_CHAT_NOTIFICATIONS,
    getChatNotificationService,
    {
      onError: (error: Record<any, any>) => {
        const err = error?.response?.data?.message || ErrorMsgDefault
        setError(err)
      },
    }
  )
  const { data, status, refetch } = getChatNotificationsQuery
  return {
    chatNotifications: data?.data,
    status,
    refetchChatNotifications: refetch,
    errorChatNotifications: error,
  }
}

export const useCleanUpChatNotifications = (userId: string) => {
  const [error, setError] = useState('')
  const cleanNoti = useCleanUpNotificationService()
  const cleanUpNotificationsQuery = useQuery<any, Error>(
    CLEAN_UP_CHAT_NOTIFICATIONS,
    () => cleanNoti(userId),
    {
      onError: (error: Record<any, any>) => {
        const err = error?.response?.data?.message || ErrorMsgDefault
        setError(err)
      },
    }
  )
  const { data, status, refetch } = cleanUpNotificationsQuery
  return {
    cleanUpNotify: data?.data,
    status,
    refetchCleanUpNotify: refetch,
    errorChatCleanUp: error,
  }
}
