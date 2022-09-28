/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardLayout from 'containers/AdminDashboardLayout'
import LargeCardWithChildren from '../../../componentsDoctors/LargeCardWithChildren'
import styles from './style.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'
import NoProfile from 'public/images/no-profile.svg'
import SyncIcon from '@mui/icons-material/Sync'
import toInitials from 'utils/toInitials'
import { toFullName } from 'utils/toFullName'
import { useAdminProfile } from 'network/ReactQuery/Queries/Admin/adminProfile'

const Profile = () => {
  const { adminProfile } = useAdminProfile()

  return (
    <>
      <Head>
        <title>Profile -- BetaCare</title>
      </Head>
      <div className={styles.head}>Profile</div>
      <div className={styles.flexify}>
        <LargeCardWithChildren
          wd="488px"
          hg="700px"
          maxw="100%"
          removeMargins={true}
        >
          <div className={styles.wrapper}>
            <div className={styles.whead}>
              <Avatar
                src={
                  adminProfile?.profilePics
                    ? adminProfile?.profilePics
                    : adminProfile?.NoProfile
                }
                sx={{ width: 144, height: 144 }}
                alt="profile image"
              />
              <div>
                {adminProfile?.firstName + ' ' + adminProfile?.lastName}
              </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.basic}>
              <div>Basic Information</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Gender</div>
                  <div>{adminProfile?.gender}</div>
                </div>
                {/* <div className={styles.flexSpace}>
                  <div>Age</div>
                  <div>34</div>
                </div> */}
              </div>
            </div>
            <div className={styles.basic}>
              <div>Contact Information</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Email</div>
                  <div>{adminProfile?.email}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Phone number</div>
                  <div>{adminProfile?.phoneNumber}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Address</div>
                  <div>{adminProfile?.address}</div>
                </div>
              </div>
            </div>
          </div>
        </LargeCardWithChildren>
      </div>
    </>
  )
}

Profile.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Profile
