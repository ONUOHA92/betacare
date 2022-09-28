import React, { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { useChatNotifications } from 'network/ReactQuery/Queries/ChatNotifications/useChatNotifications'
import { USER_TOKEN } from 'network/config/queryKeys'
import { socketConn } from 'utils/socketConfig'
import useSocket from 'hooks/useSocket'
import { DOCTOR, PATIENT, SOCKET_INDEX } from 'constants/constants'
import SocketEvents from 'constants/enums/socketEvents'
import { INotifyMsg, IOtherNotification } from 'interface/chat'
import { chatNotificationsAtom } from 'recoilStore/Atoms/chatAtom'

export const NotificationContext = React.createContext(null)
export const SocketContext = React.createContext(null)
export const NotificationContextProvider = ({ children }) => {
  const { chatNotifications, refetchChatNotifications } = useChatNotifications()
  const mainSocketConnection = socketConn()
  const socketData = useSocket(mainSocketConnection, null, DOCTOR, PATIENT)
  const [onlineUsers, setOnlineUsers] = useState(null)
  const [notiAllCount, setNotiAllCount] = useState(0)
  const setNewNotification = useSetRecoilState(chatNotificationsAtom)
  const newNotification = useRecoilValue(chatNotificationsAtom)
  useEffect(() => {
    socketData[SOCKET_INDEX].on(SocketEvents.USER_ONLINE, (data: any) => {
      setOnlineUsers(Object.keys(data))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socketData[SOCKET_INDEX].on(
      SocketEvents.NOTIFY_USER,
      (data: INotifyMsg) => {
        const mainSender = data.sender
        const result = [
          {
            userId: mainSender,
            message: data.message,
          },
        ]
        setNewNotification((prev: IOtherNotification[]) => [...prev, ...result])
      }
    )

    return () => {
      socketData[SOCKET_INDEX].off(SocketEvents.NOTIFY_USER)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <RecoilRoot>
      <SocketContext.Provider
        value={{ socket: socketData[SOCKET_INDEX], onlineUsers }}
      >
        <NotificationContext.Provider
          value={{
            chatNotifications,
            updateUserNotification: refetchChatNotifications,
            setTotal: setNotiAllCount,
            newNotification,
            setNewNotification,
          }}
        >
          {children}
        </NotificationContext.Provider>
      </SocketContext.Provider>
    </RecoilRoot>
  )
}
