/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from 'react'
import 'react'
import Image from 'next/image'
import styles from './style.module.css'
import { Avatar } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { patient_routes } from '../../utils/routes'
import noti from 'public/images/icons/notification.svg'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import LargeCardWithChildren from '../../components/LargeCardWithChildren'
import notificationData from './data'
import DoctorsPill from '../../components/DoctorsPill'
import { toFullName } from 'utils/toFullName'
// import toInitials from 'utils/toInitials'
import startCase from 'lodash/startCase'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getDoctorsSearchAtom } from 'recoilStore/Atoms/doctorSearchAtom'
import { useProfile } from 'network/ReactQuery/Queries/Profile/useProfile'
import { useDebounce } from 'hooks/useDebounce'
import { useSearchForDoctors } from 'network/ReactQuery/Mutations/SearchBar/useDoctorsSearchBar'
import { useGetAllDoctors } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsprofile'
import { getUserToken, onMessageListener } from 'utils/firebaseConfig'
import { useSetFirebaseToken } from 'network/ReactQuery/Mutations/Notification/useSetFirebaseToken'
import { PATIENT_ROLE } from 'constants/constants'
import { userAtom } from 'recoilStore/Atoms/userAtom'

const Topbar = (props) => {
  const { userProfile } = useProfile()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [searchValue, setSearchValue] = React.useState('')
  const { searchData, searchForDoctorsMutation } = useSearchForDoctors()
  const debouncedSearchTerm = useDebounce(searchValue, 500)
  const [searchResults, setSearchResults] = useRecoilState(getDoctorsSearchAtom)
  const [allDocCurrentPage, setAllDocCurrentPage] = useState(0)
  const { allDoctors } = useGetAllDoctors(allDocCurrentPage)
  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState({ title: '', body: '' })
  const [isTokenFound, setTokenFound] = useState(false)
  const { roles } = useRecoilValue(userAtom)
  const profilePath =
    roles[0] === PATIENT_ROLE ? '/patients/profile' : '/doctors/profile'
  getUserToken(setTokenFound)
  const { setFirebaseToken } = useSetFirebaseToken()
  onMessageListener()
    .then((payload: any) => {
      setShow(true)
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      })
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
  const searchInt = {
    searchText: searchValue,
    page: 0,
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchForDoctorsMutation
        .mutateAsync(searchInt)
        .then((result: any) =>
          searchValue ? setSearchResults(result) : setSearchResults(allDoctors)
        )
        .catch((err) => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, debouncedSearchTerm])

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
    typeof Window !== 'undefined' &&
      window?.addEventListener('resize', handlePopOver)
    return () =>
      typeof Window !== 'undefined' &&
      window?.removeEventListener('resize', handlePopOver)
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
      (uriQuery === 0 && router.pathname === patient_routes.LABORATORY) ||
      (uriQuery === 0 && router.pathname === patient_routes.DOCTORS)
    ) {
      return true
    } else if (uriQuery !== 0) {
      return false
    }
    return false
  }

  const lab = router.pathname === patient_routes.LABORATORY
  const doc = router.pathname === patient_routes.DOCTORS

  const handleSearchClicked = () => {
    if (lab) {
      router.push('/patients/laboratory/search')
    }
  }

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={styles.positionTop}>
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
                    : 'Search by Name...'
                }
                defaultValue={searchValue}
                className={styles.searchField}
                onClick={handleSearchClicked}
                onChange={handleChange}
              />
            </div>
          )}
          <div className={`${styles.background} ${styles.wrapper}`}>
            <div>
              <div>
                <div className={styles.topContainer}>
                  {/* TO BE ADDED WHEN NOTIFICATION ENDPOINT IS AVAILABLE
                  <Image
                    src={noti}
                    alt="user image"
                    aria-describedby={id}
                    onClick={handleClick}
                    className={styles.onHover}
                  /> */}
                  <div>
                    <Link href={profilePath}>
                      <Avatar className={styles.profilePicture}>
                        {userProfile?.profilePics ? (
                          <Image
                            src={userProfile?.profilePics}
                            alt="user avatar"
                            width="50px"
                            height="50px"
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        ) : null}
                      </Avatar>
                    </Link>
                  </div>
                  <p className={styles.topName}>
                    {startCase(
                      toFullName({
                        firstName: userProfile?.firstName,
                        lastName: userProfile?.lastName,
                      })
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Topbar
