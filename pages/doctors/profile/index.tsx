/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState } from 'react'

import LargeCardWithChildren from '../../../componentsDoctors/LargeCardWithChildren'
import styles from './styles.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'
import SyncIcon from '@mui/icons-material/Sync'
import toInitials from 'utils/toInitials'
import { toFullName } from 'utils/toFullName'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)
const Profile = () => {
  return (
    <>
      <Head>
        <title>Profile -- BetaCare</title>
      </Head>
      <div className={styles.head}>Profile</div>
      <div className={styles.flexify}>
        <LargeCardWithChildren
          wd="488px"
          hg="999px"
          maxw="100%"
          removeMargins={true}
        >
          <div className={styles.wrapper}>
            <div className={styles.whead}>
              <div></div>
              <div>Basic Plan</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.basic}>
              <div>Basic Information</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Gender</div>
                  <div></div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Age</div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className={styles.basic}>
              <div>Contact Information</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Email</div>
                  <div></div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Phone number</div>
                  <div></div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Address</div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className={styles.basic}>
              <div>Medical Information</div>
              <div className={styles.flexSpace}>
                <div>Speciality</div>
                <div></div>
              </div>
              <div className={styles.flexSpace}>
                <div>Qualifications</div>
                <div></div>
              </div>
            </div>
          </div>
        </LargeCardWithChildren>
        <LargeCardWithChildren
          wd="488px"
          hg="308px"
          maxw="100%"
          removeMargins={true}
        >
          <div className={styles.wrapper}>
            <div className={styles.basic}>
              <div>About (bio)</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Bio</div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </LargeCardWithChildren>
        <style jsx>{`
          .initials {
            font-family: Poppins;
            font-weight: 500;
            font-size: 36px;
            line-height: 54px;
          }
        `}</style>
      </div>
    </>
  )
}

Profile.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Profile
