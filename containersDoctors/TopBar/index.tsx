/* eslint-disable @next/next/link-passhref */
import React, { useContext, useEffect, useState } from 'react'
import 'react'
import Image from 'next/image'
import styles from './style.module.css'
import { Avatar, Badge, Button, IconButton } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { routes_doctor } from '../../utils/routes'
import noti from 'public/images/icons/notification.svg'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import LargeCardWithChildren from '../../componentsDoctors/LargeCardWithChildren'
import notificationData from './data'
import DoctorsPill from '../../componentsDoctors/DoctorsPill'
import { getUserToken, onMessageListener } from 'utils/firebaseConfig'
import { useSetFirebaseToken } from 'network/ReactQuery/Mutations/Notification/useSetFirebaseToken'
import { toFullName } from 'utils/toFullName'
import toInitials from 'utils/toInitials'
import startCase from 'lodash/startCase'
import SyncIcon from '@mui/icons-material/Sync'

const Topbar = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState({ title: '', body: '' })
  const [isTokenFound, setTokenFound] = useState(false)
  getUserToken(setTokenFound)
  const { setFirebaseToken } = useSetFirebaseToken()
  onMessageListener()
    .then((payload: any) => {
      setShow(true)
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      })
      console.log(payload)
    })
    .catch((err) => console.log('failed: ', err))

  const [rerender, setRerender] = useState(Math.random())
  const token =
    typeof Window !== 'undefined' && localStorage.getItem('image_url')
  const setToken =
    typeof Window !== 'undefined' && sessionStorage.getItem('tokenSent')

  useEffect(() => {
    setRerender(Math.random())
  }, [token])

  useEffect(() => {
    const token = sessionStorage.getItem('fcmToken')
    if (token) {
      setFirebaseToken(token)
    }
  }, [])

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : ''

  useEffect(() => {
    const handlePopOver = () => {
      handleClose()
    }
    window?.addEventListener('resize', handlePopOver)
    return () => window?.removeEventListener('resize', handlePopOver)
  }, [])

  const getCustomFill = (type: string) => {
    if (type === 'blue') {
      return '#D7ECFF'
    } else if (type === 'yellow') {
      return '#FFE5D5'
    } else {
      return '#CFF7D8'
    }
  }

  const isSearchRevealed = () => {
    const uriQuery = Object.keys(router?.query).length
    if (
      (uriQuery === 0 && router.pathname === routes_doctor.DOCTORS_MESSAGES) ||
      (uriQuery === 0 &&
        router.pathname === routes_doctor.DOCTORS_LABORATORY) ||
      router.pathname === routes_doctor.DOCTORS_PHARMACY
    ) {
      return true
    } else if (uriQuery !== 0) {
      return false
    }
    return false
  }

  const lab = router.pathname === routes_doctor.DOCTORS_LABORATORY
  const pharm = router.pathname === routes_doctor.DOCTORS_PHARMACY

  return (
    <>
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className={`${styles.absolufyMe}`}
        >
          <Typography sx={{ div: 2 }}>
            <div>
              <LargeCardWithChildren wd="396px" hg="434px" removeMargins={true}>
                {notificationData.map((noti) => (
                  <div key={noti.id} className={styles.mainFlex}>
                    <div className={styles.mainFlex1}>
                      <svg
                        width="8"
                        height="134"
                        viewBox="0 0 8 134"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="8"
                          height="134"
                          fill={getCustomFill(noti.type)}
                        />
                      </svg>
                    </div>
                    <div className={styles.mainFlex2}>
                      <DoctorsPill fill={getCustomFill(noti.type)} />
                      <div className={styles.mainFlex3}>
                        <div className={styles.mainFlex5}>
                          {noti.title}{' '}
                          <span className={styles.mainFlex4}>{noti.time}</span>
                        </div>
                        <div>{noti.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </LargeCardWithChildren>
            </div>
          </Typography>
        </Popover>
      </div>
      <div className={styles.topFlexxy}>
        <div
          className={`${styles.addFlexxy} ${
            !isSearchRevealed() ? styles.spaceBetween : ''
          }`}
        >
          {isSearchRevealed() && (
            <div className={styles.searchBox}>
              <input
                placeholder={
                  lab
                    ? 'Search by Laboratory, Speciality...'
                    : pharm
                    ? 'Search by Pharmacy...'
                    : 'Search...'
                }
                className={styles.searchField}
                onClick={() => {
                  lab
                    ? router.push('/doctors/laboratory/search')
                    : pharm
                    ? router.push('/doctors/pharmacy?searchResult')
                    : null
                }}
              />
            </div>
          )}
          <div className={`${styles.background} ${styles.wrapper}`}>
            <div>
              <div>
                <div className={styles.topContainer}>
                  <Image
                    src={noti}
                    alt=""
                    aria-describedby={id}
                    onClick={handleClick}
                    className={styles.onHover}
                  />
                  <div>
                    <Link href="/doctors/profile">
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          backgroundColor: '#1E223E',
                        }}
                        alt="profile image"
                      >
                        {/* {profile?.profilePics ? (
                          <img
                            src={profile?.profilePics}
                            width="100%"
                            height="100%"
                            alt=""
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        ) : profile_status.isLoading ? (
                          <SyncIcon />
                        ) : (
                          <p className="initials">
                            {toInitials(
                              toFullName({
                                firstName: profile?.firstName,
                                lastName: profile?.lastName,
                              })
                            )}
                          </p>
                        )} */}
                      </Avatar>
                    </Link>
                  </div>
                  <p className={styles.topName}>
                    {/* {startCase(
                      toFullName({
                        firstName: profile?.firstName,
                        lastName: profile?.lastName,
                      })
                    )} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .initials {
            font-family: Poppins;
            font-weight: 500;
            font-size: 1rem;
            line-height: 54px;
            cursor: pointer;
          }
        `}</style>
      </div>
    </>
  )
}
export default Topbar
