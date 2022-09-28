import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './style.module.css'
import Head from 'next/head'
import BlankCardLarge from 'components/BlankCardLarge'
import userSvg from 'public/images/patient/settings/user.svg'
import keySvg from 'public/images/patient/settings/key.svg'
import bellSvg from 'public/images/patient/settings/bell.svg'
import trackerSvg from 'public/images/patient/settings/tracker.svg'
import Image from 'next/image'
import PersonalInformation from 'containers/PersonalInformation'
import ContactInformation from 'containers/ContactInformation'
import DetailInformation from 'containers/DetailInformation'
import EmergencyContact from 'containers/EmergencyContact'
import SubUser from 'containers/SubUser'
import DetailLOC from 'containers/DetailLOC'
import MeasurementLOC from 'containers/MeasurementLOC'
import MedicalsLOC from 'containers/MedicalsLOC'
import EditPassword from 'containers/EditPassword'
import PeriodTracker from 'components/PeriodTTracker'
import { useGetSubscription } from 'network/ReactQuery/Queries/Subscription/useSubscription'
import { patient_routes } from 'utils/routes'
import { useRouter } from 'next/router'
import { useMedicalProfile } from 'network/ReactQuery/Queries/Profile/useMedicalProfile'
import { useSetRecoilState } from 'recoil'
import { medicalBasicInfoAtom } from 'recoilStore/Atoms/basicMedicalInfoAtom'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const SubscriptionPay = dynamic(() => import('components/SubscriptionPay'), {
  ssr: false,
})

const Settings = () => {
  const [activeBasic, setActiveBasic] = useState(true)
  const [activeMedical, setActiveMedical] = useState(false)
  const [activePass, setActivePass] = useState(false)
  const [activeSubscription, setActiveSubscription] = useState(false)
  const [activePeriod, setActivePeriod] = useState(false)
  // Tabs local state
  const [activePI, setActivePI] = useState(true)
  const [activeCI, setActiveCI] = useState(false)
  const [detail, setDetail] = useState(false)
  const [emergency, setEmergency] = useState(false)
  const [subUser, setSubUser] = useState(false)

  // Tabs Triggers
  const triggerTab = (type) => {
    if (type === 'pi') {
      setActivePI(true)
      setActiveCI(false)
      setDetail(false)
      setEmergency(false)
      setSubUser(false)
    }

    if (type === 'ci') {
      setActivePI(false)
      setActiveCI(true)
      setDetail(false)
      setEmergency(false)
      setSubUser(false)
    }

    if (type === 'di') {
      setActivePI(false)
      setActiveCI(false)
      setDetail(true)
      setEmergency(false)
      setSubUser(false)
    }

    if (type === 'em') {
      setActivePI(false)
      setActiveCI(false)
      setDetail(false)
      setEmergency(true)
      setSubUser(false)
    }
    if (type === 'su') {
      setSubUser(true)
      setActivePI(false)
      setActiveCI(false)
      setDetail(false)
      setEmergency(false)
    }
  }

  const triggerActiveness = (type) => {
    if (type === 'activeBasic') {
      setActiveBasic(true)
      setActiveMedical(false)
      setActivePass(false)
      setActivePeriod(false)
      setActiveSubscription(false)
    }

    if (type === 'activeMedical') {
      setActiveBasic(false)
      setActiveMedical(true)
      setActivePI(true)
      setActivePass(false)
      setActivePeriod(false)
      setActiveSubscription(false)
    }
    if (type === 'activePass') {
      setActivePass(true)
      setActiveBasic(false)
      setActiveMedical(false)
      setActivePeriod(false)
      setActiveSubscription(false)
    }
    if (type === 'activeSubscription') {
      setActiveSubscription(true)
      setActivePass(false)
      setActiveBasic(false)
      setActivePeriod(false)
      setActiveMedical(false)
    }
    if (type === 'activePeriod') {
      setActivePeriod(true)
      setActivePass(false)
      setActiveBasic(false)
      setActiveSubscription(false)
      setActiveMedical(false)
    }
  }

  const { currentSubscription } = useGetSubscription()
  const router = useRouter()

  const handleSubscriptionPlan = () => {
    if (
      currentSubscription &&
      currentSubscription?.httpStatus !== 'NOT_FOUND'
    ) {
      triggerActiveness('activeSubscription')
    } else {
      router.push(patient_routes.SUBSCRIPTION)
    }
  }

  const { userMedicalProfile } = useMedicalProfile()

  const setMedicalBasicInfo = useSetRecoilState(medicalBasicInfoAtom)
  setMedicalBasicInfo(userMedicalProfile)

  return (
    <>
      <Head>
        <title>Settings -- BetaCare</title>
      </Head>
      <div className={styles.welcome}>Settings</div>
      <div className={styles.mainContainer}>
        <BlankCardLarge wd={'260px'} bdr="16px" hg="610px" bdc="#E5E5E5">
          <div className={styles.container}>
            <div className={styles.flexify}>
              <div className={styles.left}>
                <Image src={userSvg} alt="user icon" />
              </div>
              <div className={styles.right}>
                <div className={styles.header}>Account settings</div>
                <div
                  onClick={() => triggerActiveness('activeBasic')}
                  className={`${styles.rightItem} ${activeBasic ? styles.active : ''
                    }`}
                >
                  Basic information
                </div>
                <div
                  onClick={() => triggerActiveness('activeMedical')}
                  className={`${styles.rightItem} ${activeMedical ? styles.active : ''
                    }`}
                >
                  Medical information
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.flexify}>
              <div className={styles.left}>
                <Image src={keySvg} alt="key icon" />
              </div>
              <div className={styles.right}>
                <div className={styles.header}>Password settings</div>
                <div
                  onClick={() => triggerActiveness('activePass')}
                  className={`${styles.rightItem} ${activePass ? styles.active : ''
                    }`}
                >
                  Change password
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.flexify}>
              <div className={styles.left}>
                <Image src={bellSvg} alt="Sub icon" />
              </div>
              <div className={styles.right}>
                <div
                  onClick={() => handleSubscriptionPlan()}
                  className={`${styles.header} ${styles.hoverMe}  ${activeSubscription ? styles.active : ''
                    }`}
                >
                  Subscription Plan
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.container} ${styles.lastContainer}`}>
            <div className={styles.flexify}>
              <div className={styles.left}>
                <Image src={trackerSvg} alt="Sub icon" />
              </div>
              <div className={styles.right}>
                <div
                  onClick={() => triggerActiveness('activePeriod')}
                  className={`${styles.header} ${styles.hoverMe}  ${activePeriod ? styles.active : ''
                    }`}
                >
                  Period tracker
                </div>
              </div>
            </div>
          </div>
        </BlankCardLarge>
        {activeBasic && (
          <BlankCardLarge bdr="16px" bdc="#E5E5E5">
            <div className={styles.innerContainer}>
              <div
                className={`${styles.header} ${activePI ? styles.opacity1 : ''
                  }`}
              >
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('pi')}
                >
                  <span className={`${activePI ? styles.bold : ''}`}>
                    Personal information
                  </span>

                  <span
                    className={`${activePI ? styles.activeBorder : ''}`}
                  ></span>
                </span>
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('ci')}
                >
                  <span className={`${activeCI ? styles.bold : ''}`}>
                    Contact information
                  </span>

                  <span
                    className={`${activeCI ? styles.activeBorder : ''}`}
                  ></span>
                </span>
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('di')}
                >
                  <span className={`${detail ? styles.bold : ''}`}>
                    Details
                  </span>

                  <span
                    className={`${detail ? styles.activeBorderr : ''}`}
                  ></span>
                </span>
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('em')}
                >
                  <span className={`${emergency ? styles.bold : ''}`}>
                    Next of Kin
                  </span>

                  <span
                    className={`${emergency ? styles.activeBorder3 : ''}`}
                  ></span>
                </span>
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('su')}
                >
                  <span className={`${subUser ? styles.bold : ''}`}>
                    Sub users
                  </span>

                  <span
                    className={`${subUser ? styles.activeBorder3 : ''}`}
                  ></span>
                </span>
              </div>
              {activePI && (
                <div className={styles.personalInfo}>
                  <PersonalInformation />
                </div>
              )}
              {activeCI && (
                <div className={styles.personalInfo}>
                  <ContactInformation />
                </div>
              )}
              {detail && (
                <div className={styles.personalInfo}>
                  <DetailInformation />
                </div>
              )}
              {emergency && (
                <div className={styles.personalInfo}>
                  <EmergencyContact />
                </div>
              )}
              {subUser && (
                <div className={styles.personalInfo}>
                  <SubUser />
                </div>
              )}
            </div>
          </BlankCardLarge>
        )}
        {activeMedical && (
          <BlankCardLarge bdr="16px" bdc="#E5E5E5" wd="700px">
            <div className={styles.innerContainer}>
              <div
                className={`${styles.header} ${activePI ? styles.opacity1 : ''
                  }`}
              >
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('pi')}
                >
                  <span className={`${activePI ? styles.bold : ''}`}>
                    Details
                  </span>

                  <span
                    className={`${activePI ? styles.activeBordero2 : ''}`}
                  ></span>
                </span>
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('ci')}
                >
                  <span className={`${activeCI ? styles.bold : ''}`}>
                    Measurement
                  </span>

                  <span
                    className={`${activeCI ? styles.activeBordero3 : ''}`}
                  ></span>
                </span>
                <span
                  className={styles.relative}
                  onClick={() => triggerTab('di')}
                >
                  <span className={`${detail ? styles.bold : ''}`}>
                    Medicals
                  </span>

                  <span
                    className={`${detail ? styles.activeBorderr : ''}`}
                  ></span>
                </span>
              </div>
              {activePI && (
                <div className={styles.personalInfo}>
                  <DetailLOC />
                </div>
              )}
              {activeCI && (
                <div className={styles.personalInfo}>
                  <MeasurementLOC />
                </div>
              )}
              {detail && (
                <div className={styles.personalInfo}>
                  <MedicalsLOC />
                </div>
              )}
            </div>
          </BlankCardLarge>
        )}
        {activePass && (
          <BlankCardLarge bdr="16px" bdc="#E5E5E5" wd="700px" hg="550px">
            <div className={styles.innerContainer}>
              <div className={styles.personalInfo}>
                <EditPassword />
              </div>
            </div>
          </BlankCardLarge>
        )}
        {activeSubscription && (
          <BlankCardLarge bdr="16px" bdc="#E5E5E5" wd="700px">
            <SubscriptionPay />
          </BlankCardLarge>
        )}
        {activePeriod && (
          <BlankCardLarge bdr="16px" bdc="#E5E5E5" wd="700px">
            <div className={styles.innerContainer}>
              <div className={styles.personalInfo}>
                <PeriodTracker />
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
