import React, { useState } from 'react'
import styles from './style.module.css'
import { motion } from 'framer-motion'
import { routes_doctor } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { useChatNotifications } from 'network/ReactQuery/Queries/ChatNotifications/useChatNotifications'
import { USER_TOKEN } from 'network/config/queryKeys'
import { socketConn } from 'utils/socketConfig'
import useSocket from 'hooks/useSocket'
import { DOCTOR, PATIENT, SOCKET_INDEX } from 'constants/constants'
import SocketEvents from 'constants/enums/socketEvents'
import Topbar from 'containers/TopBar'
import { INotifyMsg, IOtherNotification } from 'interface/chat'
import { chatNotificationsAtom } from 'recoilStore/Atoms/chatAtom'
import dynamic from 'next/dynamic'

const SideBar = dynamic(() => import('containersDoctors/SideBar'), {
  ssr: false,
})
const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export const NotificationContext = React.createContext(null)
export const SocketContext = React.createContext(null)

const MainLayout = ({ children }: React.PropsWithChildren<React.ReactNode>) => {
  useEffect(() => {
    try {
      const tokenVisible = getWithExpiry(USER_TOKEN)
      if (!tokenVisible) {
        routes_doctor.LOGIN
      }
    } catch (err) {}
  }, [])
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

  useEffect(() => {
    setNotiAllCount(newNotification?.length)
  }, [newNotification])

  return (
    <>
      <RecoilRoot>
        <SocketContext.Provider
          value={{ socket: socketData[SOCKET_INDEX], onlineUsers }}
        >
          <div className={styles.wrapper}>
            <NotificationContext.Provider
              value={{
                chatNotifications,
                updateUserNotification: refetchChatNotifications,
                setTotal: setNotiAllCount,
                newNotification,
                setNewNotification,
              }}
            >
              <SideBar notiAllCount={notiAllCount} />
              <main className={styles.main}>
                <Topbar />
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  transition={{ type: 'linear' }}
                >
                  <section className={styles.section}>{children}</section>
                </motion.div>
              </main>
            </NotificationContext.Provider>
          </div>
        </SocketContext.Provider>
      </RecoilRoot>
    </>
  )
}

function DashboardLayout({
  children,
}: React.PropsWithChildren<React.ReactNode>) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <MainLayout>{children}</MainLayout>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default DashboardLayout
