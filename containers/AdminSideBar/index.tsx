import activitiesIcon from 'public/sidebaricons/activities.svg'
import doctorsIcon from 'public/sidebaricons/doctors.svg'
import homeIcon from 'public/images/icons/home.svg'
import labIcon from 'public/sidebaricons/lab.svg'
import logoutIcon from 'public/sidebaricons/logout.svg'
import messagesIcon from 'public/images/icons/messages 2.svg'
import userAdminIcon from 'public/images/icons/user_admin_icon.svg'
import userSubAdminIcon from 'public/images/icons/user_sub_admin.svg'
import settingsIcon from 'public/sidebaricons/settings.svg'
import Logo from 'components/Logo'
import Image from 'next/image'
import styles from 'styles/sidebar.module.css'
import { admin_routes } from 'utils/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DehazeIcon from '@mui/icons-material/Dehaze'
import CloseIcon from '@mui/icons-material/Close'
import { useClickOutside } from 'utils/useClickOutside'
import { useMediaQuery } from 'react-responsive'
import Popups from 'components/Popup'
import { useState, useEffect } from 'react'

type SideBarLink = {
  name: string
  icon: any
  link: string
}

const sideBarLinks: SideBarLink[] = [
  {
    name: 'Home',
    icon: homeIcon,
    link: admin_routes.HOME,
  },
  {
    name: "Doctor's request",
    icon: doctorsIcon,
    link: admin_routes.REQUEST,
  },
  {
    name: 'Third party user',
    icon: userAdminIcon,
    link: admin_routes.THIRD_PARTY,
  },
  {
    name: 'Sub Admins',
    icon: userSubAdminIcon,
    link: admin_routes.SUB_ADMIN,
  },
  {
    name: 'Activities',
    icon: activitiesIcon,
    link: admin_routes.ACTIVITIES,
  },
]

const sideBarLower: SideBarLink[] = [
  {
    name: 'Settings',
    icon: settingsIcon,
    link: admin_routes.SETTINGS,
  },
  {
    name: 'Log-out',
    icon: logoutIcon,
    link: admin_routes.LOGOUT,
  },
]

const AdminSideBar = () => {
  const currentRoute = useRouter()

  const isPath = (link: string) => {
    return currentRoute?.pathname === link
  }
  const [open, setOpen] = useState(false)
  const [toggler, setToggler] = useState(false)

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
    query: '(min-width:  760px)',
  })

  useEffect(() => {
    if (breakPoint) {
      handleToggler('open')
    } else {
      handleToggler('close')
    }
  }, [breakPoint])

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
                      3
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
                    <Image src={sidebar.icon} alt="" />
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
                  onClick={() => setOpen(true)}
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

export default AdminSideBar
