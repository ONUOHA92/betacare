// @ts-nocheck

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import DashboardLayout from 'containersDoctors/DashboardLayout'
import SmallCard from 'containersDoctors/SmallCard'
import LargeCard from 'containersDoctors/LargeCard'
import PrescriptionCard from 'containersDoctors/PrescriptionCard'
import ReqAppointmentCard from 'containersDoctors/ReqAppointmentCard'
import AppointmentCard from 'containersDoctors/AppointmentCard'
import PharmacyCard from 'containersDoctors/PharmacyCard'
import LabCard from 'containersDoctors/LabCard'
import LargeCardWithChildren from 'componentsDoctors/LargeCardWithChildren'
import stylelo from './styles.module.css'
import Button from '@mui/material/Button'
import styles from 'styles/sidebar.module.css'

//to  fetch doctors profile
import { useGetDoctorProfile } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsprofile'
import { useGetDoctorAppointment } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsUpcomingAppointment'
import { useGetDoctorRequestAppoint } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsRequestAppount'
// icons
import calender from 'public/images/icons/calender.svg'
import mprescriptions from 'public/images/icons/mprescriptions.svg'
import doctor from 'public/images/icons/doctor2.svg'
import heart from 'public/images/icons/heart.svg'
import chain from 'public/images/icons/chain.svg'
import { prescriptionsMultiple } from 'utils/mocking_data'
import LabCardWithChildren from 'componentsDoctors/LabCardWithChildren'
import { cardDetails } from 'utils/mocking_data'
import { useAgoraRtmToken } from 'network/ReactQuery/Queries/ChatMessages/agoraToken'
import { rtmLogin } from 'utils/agora-rtm-client'

import startCase from 'lodash/startCase'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'recoilStore/Atoms/userAtom'

const DoctorDashboard = () => {
  //to get Doctors profile
  const { doctorsProfile, isLoading, doctorsProfileError } =
    useGetDoctorProfile()
  const { doctorsupAppointment, doctorsupAppointmentError } =
    useGetDoctorAppointment()
  const { doctorsrequest, doctorsrequestError } = useGetDoctorRequestAppoint()

  const { agoraRtmToken } = useAgoraRtmToken()

  const token: string = agoraRtmToken?.data?.message
  const { id } = useRecoilValue(userAtom)

  const tokenSet = sessionStorage.getItem('agoraLogin')

  useEffect(() => {
    if (token && !tokenSet) {
      rtmLogin(id.toString(), token)
    }
  }, [id, token, tokenSet])

  const [isAppEmpty, setIsAppEmpty] = useState(true)

  const circleColorGenerator = (color: string) => {
    if (color === '#359EFF') {
      return '#1890FF'
    } else if (color === '#FE7F2D') {
      return '#FE7F2D'
    } else if (color === '#0ED63A') {
      return '#0ED63A'
    } else {
      return '#5C31D9'
    }
  }
  useEffect(() => {
    setTimeout(() => {
      // queryPeerOnlineStatus()
    }, 3000)
  }, [])

  return (
    <>
      <div className={stylelo.welcome}>
        Welcome, Dr {startCase(doctorsProfile?.data?.firstName)}{' '}
        {startCase(doctorsProfile?.data?.lastName)}!
      </div>
      <div className={stylelo.smallCard}>
        <SmallCard
          icon={calender}
          title="Requested Appointments"
          count={isLoading ? 0 : doctorsrequest?.data?.totalElements}
        />
        <SmallCard
          icon={doctor}
          title="Patients Interaction"
          count={isLoading ? 0 : doctorsProfile?.data?.patientInteractionCount}
        />
        <SmallCard
          icon={mprescriptions}
          title="Upcoming Appointments"
          count={isLoading ? 0 : doctorsupAppointment?.data?.totalElements}
        />
      </div>

      <div className={stylelo.flexify}>
        {!doctorsrequest?.data?.totalElements ? (
          <LargeCard
            wd="648px"
            hg="300px"
            icon={heart}
            title="Requested appointments"
            text={cardDetails[0].text}
            addMarginTop={true}
          />
        ) : (
          <LargeCardWithChildren
            wd="700px"
            hg="300px"
            icon={heart}
            title="Requested appointments"
            text={cardDetails[1].text}
            btn={true}
            alignTitle={true}
          >
            <div className={stylelo.flexxyDoc}>
              {doctorsrequest?.data?.content?.map((appt) => (
                <ReqAppointmentCard
                  key={appt.id}
                  name={appt.patientName}
                  time={appt.time}
                  date={appt.date}
                />
              ))}
            </div>
            <div className={stylelo.btnDiv}>
              <Link href={`/doctors/appointment`} passHref scroll={false}>
                <Button
                  wd="50px"
                  hg="50px"
                  color="secondary"
                  className={stylelo.presBtn2}
                >
                  View all appointments{' '}
                  <svg
                    width="9"
                    height="14"
                    viewBox="0 0 9 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 12L5.5 7L0.5 2L1.5 0L8.5 7L1.5 14L0.5 12Z"
                      fill="#1F56C3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </LargeCardWithChildren>
        )}
        {isAppEmpty ? (
          <LargeCard
            wd="381px"
            icon={heart}
            title="Upcoming appointments"
            text={cardDetails[1].text}
            addMarginTop={true}
          />
        ) : (
          <LargeCardWithChildren
            wd="381px"
            hg="761px"
            icon={heart}
            title="Upcoming appointments"
            text={cardDetails[1].text}
            btn={true}
          >
            {doctorsupAppointment?.data?.content?.map((appointment) => (
              <div key={appointment.id}>
                <div className={stylelo.flexRow}>
                  <div className={stylelo.sideLine}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle
                        cx="5"
                        cy="5"
                        r="4"
                        fill="white"
                        stroke={circleColorGenerator(appointment.color)}
                        strokeWidth="2"
                      />
                    </svg>
                    <svg width="2" height="125" viewBox="0 0 2 125" fill="none">
                      <path d="M1 0V125" stroke="#F0F0F0" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className={stylelo.appCard}>
                    <AppointmentCard
                      wd="302px"
                      hg="123px"
                      title={appointment.doctor}
                      name={appointment.name}
                      date={appointment.date}
                      item={appointment.item}
                      time={appointment.time}
                      active={appointment.active}
                      color={appointment.color}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              wd="50px"
              hg="50px"
              color="secondary"
              className={`${stylelo.presBtn} ${stylelo.adjustMarginBtn}`}
            >
              All appointments{' '}
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 12L5.5 7L0.5 2L1.5 0L8.5 7L1.5 14L0.5 12Z"
                  fill="#1F56C3"
                />
              </svg>
            </Button>
          </LargeCardWithChildren>
        )}
      </div>
      <div className={stylelo.flexify}>
        <LabCardWithChildren
          wd="1180px"
          hg="735px"
          title="Patients laboratory results"
          text={cardDetails[1].text}
        >
          <div className={styles.makeContainer}>
            {prescriptionsMultiple.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                wd="500px"
                hg="151px"
                icon={chain}
                title="Prescription"
                name={prescription.name}
                date={prescription.date}
                item={prescription.item}
                time={prescription.timeSince}
                active={prescription.active}
                type="lab"
                status={prescription.status}
                prescriptionId={prescription.id}
              />
            ))}
          </div>
        </LabCardWithChildren>
      </div>
      <div className={stylelo.flexify}></div>
    </>
  )
}

// DoctorDashboard.getLayout = function getLayout(page: any) {
//   return <DashboardLayout>{page}</DashboardLayout>
// }

export default DoctorDashboard
