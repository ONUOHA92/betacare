import React, { ReactElement, useEffect, useState, useContext } from 'react'
import DashboardLayout from 'containers/AdminDashboardLayout'
import styles from './style.module.css'
import Head from 'next/head'
import BlankCardLarge from 'componentsDoctors/BlankCardLarge'
import userSvg from 'public/images/patient/settings/user.svg'
import keySvg from 'public/images/patient/settings/key.svg'
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css'

import EditPassword from 'containersDoctors/EditPassword'
import { useAdminProfile } from 'network/ReactQuery/Queries/Admin/adminProfile'
import ContactInformation from 'containersAdmin/ContactInformation'
import PersonalInformation from 'containersAdmin/PersonalInformation'

const Settings = () => {
  // const { doctorsProfile, refetchDoctorProfile } = {}
  const { adminProfile, refetchAdminProfile } = useAdminProfile()
  const [activeSetting, setActiveSetting] = useState<
    'basic' | 'medical' | 'password'
  >('basic')
  // Tabs local state
  const [activeTab, setActiveTab] = useState<'pi' | 'ci' | 'bi' | 'em'>('pi')

  // Tabs Triggers

  const [defaultMethod, setDefaultMethod] = useState('')
  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }

  return (
    <>
      <Head>
        <title>Settings -- BetaCare</title>
      </Head>
      <div className={styles.welcome}>Settings</div>
      <div className={styles.mainContainer}>
        <BlankCardLarge wd={'260px'} bdr="16px" hg="285px" bdc="#E5E5E5">
          <div className={styles.container}>
            <div className={styles.flexify}>
              <div className={styles.left}>
                <Image src={userSvg} alt="user icon" />
              </div>
              <div className={styles.right}>
                <div className={styles.header}>Account settings</div>
                <div
                  onClick={() => setActiveSetting('basic')}
                  className={`${styles.rightItem} ${
                    activeSetting === 'basic' ? styles.active : ''
                  }`}
                >
                  Basic information
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.container} ${styles.lastContainer}`}>
            <div className={styles.flexify}>
              <div className={styles.left}>
                <Image src={keySvg} alt="key icon" />
              </div>
              <div className={styles.right}>
                <div className={styles.header}>Password settings</div>
                <div
                  onClick={() => setActiveSetting('password')}
                  className={`${styles.rightItem} ${
                    activeSetting === 'password' ? styles.active : ''
                  }`}
                >
                  Change password
                </div>
              </div>
            </div>
          </div>
        </BlankCardLarge>
        {activeSetting === 'basic' && (
          <BlankCardLarge bdr="16px" bdc="#E5E5E5" wd="700px">
            <div className={styles.innerContainer}>
              <div
                className={`${styles.header} ${
                  activeTab === 'pi' ? styles.opacity1 : ''
                }`}
              >
                <span
                  className={styles.relative}
                  onClick={() => setActiveTab('pi')}
                >
                  <span className={`${activeTab === 'pi' ? styles.bold : ''}`}>
                    Personal information
                  </span>

                  <span
                    className={`${
                      activeTab === 'pi' ? styles.activeBorder : ''
                    }`}
                  ></span>
                </span>
                <span
                  className={styles.relative}
                  onClick={() => setActiveTab('ci')}
                >
                  <span className={`${activeTab === 'ci' ? styles.bold : ''}`}>
                    Contact information
                  </span>

                  <span
                    className={`${
                      activeTab === 'ci' ? styles.activeBorder : ''
                    }`}
                  ></span>
                </span>
              </div>
              {activeTab === 'pi' && (
                <div className={styles.personalInfo}>
                  <PersonalInformation
                    profile={adminProfile}
                    refetchAdminProfile={refetchAdminProfile}
                  />
                </div>
              )}
              {activeTab === 'ci' && (
                <div className={styles.personalInfo}>
                  <ContactInformation
                    profile={adminProfile}
                    refetchAdminProfile={refetchAdminProfile}
                  />
                </div>
              )}
            </div>
          </BlankCardLarge>
        )}

        {activeSetting === 'password' && (
          <BlankCardLarge bdr="16px" bdc="#E5E5E5" wd="700px" hg="500px">
            <div className={styles.innerContainer}>
              <div className={styles.personalInfo}>
                <EditPassword />
              </div>
            </div>
          </BlankCardLarge>
        )}
      </div>
    </>
  )
}

Settings.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Settings
