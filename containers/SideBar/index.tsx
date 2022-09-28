import React from 'react'
import activitiesIcon from 'public/sidebaricons/activities.svg'
import doctorsIcon from 'public/sidebaricons/doctors.svg'
import homeIcon from 'public/images/icons/home.svg'
import labIcon from 'public/sidebaricons/lab.svg'
import logoutIcon from 'public/sidebaricons/logout.svg'
import messagesIcon from 'public/images/icons/messages 2.svg'
import appointmentsIcon from 'public/images/icons/plus-sign 2.svg'
import prescriptionsIcon from 'public/images/icons/microscope 2.svg'
import settingsIcon from 'public/sidebaricons/settings.svg'
import Logo from 'components/Logo'
import Image from 'next/image'
import styles from 'styles/sidebar.module.css'
import { patient_routes } from 'utils/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Popups from 'components/Popup'
import { useContext, useEffect, useState } from 'react'
import {
  userAtom,
  totalNotificationCountAtom,
} from 'recoilStore/Atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import SocketEvents from 'constants/enums/socketEvents'
import { NotificationContext, SocketContext } from 'containers/DashboardLayout'
import { chatNotificationsAtom } from 'recoilStore/Atoms/chatAtom'

type SideBarLink = {
  name: string
  icon: any
  link: string
}

const SideBar = ({ notiAllCount }) => {
  const { socket } = useContext(SocketContext)
  const currentRoute = useRouter()

  const isPath = (link: string) => {
    return currentRoute?.pathname === link
  }
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const { id } = useRecoilValue(userAtom)
  useEffect(() => {
    const userSocket = {
      id,
      socketId: socket.id,
    }
    socket.emit(SocketEvents.ONLINE, userSocket)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  const { chatNotifications, updateUserNotification } =
    React.useContext(NotificationContext)
  const [totalNotificationCount, setTotalNotificationCount] = useRecoilState(
    totalNotificationCountAtom
  )

  useEffect(() => {
    let count = 0
    if (chatNotifications) {
      const isEmpty = Object.keys(chatNotifications).length === 0
      if (isEmpty) {
        setTotalNotificationCount(0)
      } else {
        const allNotiArray: any = Object.values(chatNotifications)
        for (const userNoti of allNotiArray) {
          const lengthOfEachUserNoti = userNoti?.length
          count += lengthOfEachUserNoti
          setTotalNotificationCount(count)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatNotifications, updateUserNotification])

  const handleLogOut = () => {
    setOpen(true)
  }

  return (
    <>
      <Popups isOpen={open} current="logout" handleClose={handleClose} />
      <div className={styles.sideBar}>
        <div className={styles.sidebarLogo}>
          <Logo />
        </div>
        <div className={styles.sidebarLink}>
          {sideBarLinks.map((sidebar) => (
            <ul
              key={sidebar.name}
              className={isPath(sidebar.link) ? styles?.active : ''}
            >
              <Link href={sidebar.link} passHref>
                <li>
                  <Image src={sidebar.icon} alt="sidebar icon" />
                  <span className={styles.text}>{sidebar.name}</span>
                  {sidebar.name === 'Messages' && (
                    <span className={styles.badgeM}>
                      {notiAllCount || totalNotificationCount}
                    </span>
                  )}
                </li>
              </Link>
            </ul>
          ))}
        </div>
        <div>
          <hr className={styles.divider} />
        </div>
        <div className={styles.sidebarLink}>
          {sideBarLower.map((sidebar) => (
            <ul
              key={sidebar.name}
              className={isPath(sidebar.link) ? styles?.active : ''}
            >
              {sidebar?.name === 'Settings' && (
                <Link href={sidebar.link} passHref>
                  <li>
                    <Image src={sidebar.icon} alt="settings icon" />
                    <span className={styles.text}>{sidebar.name}</span>
                  </li>
                </Link>
              )}
              {sidebar?.name === 'Log-out' && (
                <li
                  /* @ts-ignore */
                  onClick={() => handleLogOut()}
                >
                  <Image src={sidebar.icon} alt="" />
                  <span className={styles.text}>{sidebar.name}</span>
                </li>
              )}
            </ul>
          ))}
        </div>
      </div>
    </>
  )
}

export default SideBar

const sideBarLinks: SideBarLink[] = [
  {
    name: 'Home',
    icon: homeIcon,
    link: patient_routes.PATIENTS_HOME,
  },
  {
    name: 'Appointments',
    icon: appointmentsIcon,
    link: patient_routes.APPOINTMENTS,
  },
  {
    name: 'Prescriptions',
    icon: prescriptionsIcon,
    link: patient_routes.PRESCRIPTIONS,
  },
  {
    name: 'Doctors',
    icon: doctorsIcon,
    link: patient_routes.DOCTORS,
  },
  {
    name: 'Laboratory',
    icon: labIcon,
    link: patient_routes.LABORATORY,
  },
  {
    name: 'Messages',
    icon: messagesIcon,
    link: patient_routes.MESSAGES,
  },
  {
    name: 'Activities',
    icon: activitiesIcon,
    link: patient_routes.ACTIVITIES,
  },
]

const sideBarLower: SideBarLink[] = [
  {
    name: 'Settings',
    icon: settingsIcon,
    link: patient_routes.SETTINGS,
  },
  {
    name: 'Log-out',
    icon: logoutIcon,
    link: patient_routes.LOGOUT,
  },
]
