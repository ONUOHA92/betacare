import React, { useState, useEffect, useContext } from 'react'
import Logo from 'components/Logo'
import Image from 'next/image'
import styles from 'styles/sidebar.module.css'
import DehazeIcon from '@mui/icons-material/Dehaze'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Popups from 'componentsDoctors/Popup'
import CloseIcon from '@mui/icons-material/Close'
import { useClickOutside } from 'utils/useClickOutside'
import { useMediaQuery } from 'react-responsive'
import {
  totalNotificationCountAtom,
  userAtom,
} from 'recoilStore/Atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import SocketEvents from 'constants/enums/socketEvents'
import {
  NotificationContext,
  SocketContext,
} from 'containersDoctors/DashboardLayout'
import { sideBarLinks, sideBarLower } from 'navigation/sidebar/routes'

const SideBar = ({ notiAllCount }) => {
  const { socket } = useContext(SocketContext)
  const currentRoute = useRouter()

  const isPath = (link: string) => {
    return currentRoute?.pathname === link
  }
  const [open, setOpen] = useState(false)
  const [toggler, setToggler] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggler = (type: 'close' | 'open') => {
    if (type === 'close') {
      setToggler(true)
    } else {
      setToggler(false)
    }
  }

  let domNode = useClickOutside(() => {
    if (!breakPoint) {
      // handleToggler('close')
    } else {
      return
    }
  })

  const breakPoint = useMediaQuery({
    query: '(min-width:  768px)',
  })

  useEffect(() => {
    if (breakPoint) {
      handleToggler('open')
    } else {
      handleToggler('close')
    }
  }, [breakPoint])

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

  return toggler ? (
    <div className={styles.mainContainer}>
      <div
        className={styles.mobileToggler}
        onClick={() => handleToggler('open')}
      >
        <DehazeIcon />
      </div>
    </div>
  ) : (
    <>
      <Popups isOpen={open} current="logout" handleClose={handleClose} />
      <div
        className={`${styles.sideBar} ${!toggler ? styles.sideBarMobile : ''}`}
        ref={domNode}
      >
        <div className={`${!toggler ? styles.flexifier : ''}`}>
          <div
            className={`${styles.sidebarLogo} ${
              !toggler ? styles.sidebarLogoMobile : ''
            }`}
          >
            <Logo />
          </div>
          {!breakPoint && (
            <div
              className={`${!toggler ? styles.addCircle : ''}`}
              onClick={() => handleToggler('close')}
            >
              <CloseIcon sx={{ color: '#15326b' }} />
            </div>
          )}
        </div>

        <div className={styles.sidebarLink}>
          {sideBarLinks.map((sidebar) => (
            <ul
              key={sidebar.name}
              className={isPath(sidebar.link) ? styles?.active : ''}
            >
              <Link href={sidebar.link} passHref>
                <li>
                  <Image src={sidebar.icon} alt="" />
                  <span
                    className={`${styles.text} ${
                      !toggler ? styles.textMobile : ''
                    }`}
                  >
                    {sidebar.name}
                  </span>
                  {sidebar.name === 'Messages' && (
                    <span
                      className={`${styles.badgeM} ${
                        !toggler ? styles.textMobile : ''
                      }`}
                    >
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
                    <span
                      className={`${styles.text} ${
                        !toggler ? styles.textMobile : ''
                      }`}
                    >
                      {sidebar.name}
                    </span>
                  </li>
                </Link>
              )}
              {sidebar?.name === 'Log-out' && (
                <li
                  /* @ts-ignore */
                  onClick={() => handleLogOut()}
                >
                  <Image src={sidebar.icon} alt="" />
                  <span
                    className={`${styles.text} ${
                      !toggler ? styles.textMobile : ''
                    }`}
                  >
                    {sidebar.name}
                  </span>
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
