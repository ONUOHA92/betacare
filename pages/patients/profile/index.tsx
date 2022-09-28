/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState } from 'react'

import LargeCardWithChildren from '../../../components/LargeCardWithChildren'
import styles from './styles.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Avatar from '@mui/material/Avatar'
import { useProfile } from 'network/ReactQuery/Queries/Profile/useProfile'
import { useMedicalProfile } from 'network/ReactQuery/Queries/Profile/useMedicalProfile'
import { useGetNextOfKin } from 'network/ReactQuery/Queries/NextOfKin/useNextOfKin'
import { useGetSubUser } from 'network/ReactQuery/Queries/Subuser/useSubUser'
import { useGetSubscription } from 'network/ReactQuery/Queries/Subscription/useSubscription'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const Profile = () => {
  const { userProfile } = useProfile()
  const { userMedicalProfile } = useMedicalProfile()
  const { nextOfKin } = useGetNextOfKin()
  const { subUsers } = useGetSubUser()
  const { currentSubscription } = useGetSubscription()
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
              <Avatar
                src={userProfile?.profilePics}
                sx={{ width: 144, height: 144 }}
                alt="profile image"
              />
              <div>{`${userProfile?.firstName} ${userProfile?.lastName}`}</div>
              <div>{currentSubscription?.planType}</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.basic}>
              <div>Basic Information</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Gender</div>
                  <div>{userProfile?.gender}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Age</div>
                  <div>{userProfile?.age}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Identification number</div>
                  <div>{userProfile?.identificationNo}</div>
                </div>
              </div>
            </div>
            <div className={styles.basic}>
              <div>Contact Information</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Email</div>
                  <div>{userProfile?.email}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Phone number</div>
                  <div>{userProfile?.phoneNumber}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Address</div>
                  <div>{userProfile?.address}</div>
                </div>
              </div>
            </div>
            <div className={styles.basic}>
              <div>Next of Kin</div>
              <div className={`${styles.flexSpace}`}>
                {nextOfKin?.contacts?.map((kin) => (
                  <div key={kin.id}>{`${kin?.firstName} ${kin?.lastName}`}</div>
                ))}
              </div>
            </div>
          </div>
        </LargeCardWithChildren>
        <LargeCardWithChildren
          wd="488px"
          hg="886px"
          maxw="100%"
          removeMargins={true}
        >
          <div className={styles.wrapper}>
            <div className={styles.basic}>
              <div>Insurance Details</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Health Insurance company</div>
                  <div>{userProfile?.healthInsuranceCompany}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Health Insurance number</div>
                  <div>{userProfile?.healthInsuranceNumber}</div>
                </div>
              </div>
            </div>
            <div className={styles.basic}>
              <div>Details</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>Genotype</div>
                  <div>{userMedicalProfile?.genotype}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>Blood Type</div>
                  <div>{userMedicalProfile?.bloodGroup}</div>
                </div>
              </div>
            </div>

            <div className={styles.basic}>
              <div>Measurements</div>
              <div>
                <div className={styles.flexSpace}>
                  <div>
                    Weight <span className={styles.unit}>(kg)</span>
                  </div>
                  <div>{userMedicalProfile?.weight}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>
                    Height <span className={styles.unit}>(cm)</span>
                  </div>
                  <div>{userMedicalProfile?.height}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>
                    Chest <span className={styles.unit}>(cm)</span>
                  </div>
                  <div>{userMedicalProfile?.chest}</div>
                </div>
                <div className={styles.flexSpace}>
                  <div>
                    Waist <span className={styles.unit}>(cm)</span>
                  </div>
                  <div>{userMedicalProfile?.waist}</div>
                </div>
              </div>
            </div>

            <div className={styles.basic}>
              <div>Sub Users</div>
              <div>
                <div className={`${styles.flexSpace} ${styles.columize}`}>
                  {subUsers?.subUsers?.map((kin) => (
                    <div
                      key={kin?.id}
                    >{`${kin?.firstName} ${kin?.lastName}`}</div>
                  ))}
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
