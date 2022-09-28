// @ts-nocheck
/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import SmallCard from 'containers/SmallCard'
import LargeCard from 'containers/LargeCard'
import PrescriptionCard from 'containers/PrescriptionCard'
import AppointmentCard from 'containers/AppointmentCard'
import PharmacyCard from 'containers/PharmacyCard'
import LabCard from 'containers/LabCard'
import LargeCardWithChildren from 'components/LargeCardWithChildren'
import stylelo from './styles.module.css'
import Button from 'components/Button'

// icons
import calender from 'public/images/icons/calender.svg'
import mprescriptions from 'public/images/icons/mprescriptions.svg'
import doctor from 'public/images/icons/doctor2.svg'
import heart from 'public/images/icons/heart.svg'
import chain from 'public/images/icons/chain.svg'
import { cardDetails } from 'utils/mocking_data'
import { toFullName } from 'utils/toFullName'
import startCase from 'lodash/startCase'
import { useProfile } from 'network/ReactQuery/Queries/Profile/useProfile'
import { useGetTotalDoctorsAppointment } from 'network/ReactQuery/Queries/Appointment/useAllAppointment'
import { useGetDoctorsConversations } from 'network/ReactQuery/Queries/Conversations/useConversations'
import { useGetAllPharmacyRequests } from 'network/ReactQuery/Queries/PharmacyRequests/usePharmacyRequests'
import { useAllDoctorAppointment } from 'network/ReactQuery/Queries/Appointment/useAllAppointment'
import {
  useGetPrescriptionsCount,
  useGetAllPrescriptions,
} from 'network/ReactQuery/Queries/Prescriptions/usePrescriptions'
import {
  useGetLabRequests,
  useGetTotalLabAppointments,
} from 'network/ReactQuery/Queries/LabRequests/useLabRequests'
import { patient_routes } from 'utils/routes'
import { useAgoraRtmToken } from 'network/ReactQuery/Queries/ChatMessages/agoraToken'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { rtmLogin } from 'utils/agora-rtm-client'

const PatientDashboard = () => {
  const { userProfile } = useProfile()
  const { doctorsAppointments } = useGetTotalDoctorsAppointment()
  const { totalDoctorsConversation } = useGetDoctorsConversations()
  const { totalPrescriptionsCount } = useGetPrescriptionsCount()
  const { prescriptionsList } = useGetAllPrescriptions()
  const { pharmacyRequests } = useGetAllPharmacyRequests()
  const { labRequests } = useGetLabRequests()
  const { labAppointments } = useGetTotalLabAppointments()
  const [page] = useState(0)
  const { getAllAppointments } = useAllDoctorAppointment(page)

  const { agoraRtmToken } = useAgoraRtmToken()

  const token: string = agoraRtmToken?.data?.message
  const { id } = useRecoilValue(userAtom)

  const tokenSet = sessionStorage.getItem('agoraLogin')

  useEffect(() => {
    if (token && !tokenSet) {
      rtmLogin(id.toString(), token)
    }
  }, [id, token, tokenSet])
  const circleColorGenerator = (color: number) => {
    if (color === 0) {
      return '#1890FF'
    } else if (color === 1) {
      return '#FE7F2D'
    } else if (color === 2) {
      return '#0ED63A'
    } else {
      return '#5C31D9'
    }
  }

  return (
    <>
      <div className={stylelo.welcome}>
        Welcome,{' '}
        {startCase(
          toFullName({
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
          })
        )}
        !
      </div>
      <div className={stylelo.smallCard}>
        <SmallCard
          icon={calender}
          title="Appointments"
          count={
            labAppointments?.totalNumberOfLaboratoryAppointments +
            doctorsAppointments?.totalNumberOfDoctorsAppointments
          }
        />
        <SmallCard
          icon={doctor}
          title="Doctor's Interaction"
          count={totalDoctorsConversation?.totalNumberOfConversation}
        />
        <SmallCard
          icon={mprescriptions}
          title="Prescriptions"
          count={totalPrescriptionsCount?.totalNumberOfPrescription}
        />
      </div>

      <div className={stylelo.flexify}>
        {prescriptionsList?.content.length === 0 ? (
          <LargeCard
            wd="648px"
            hg="400px"
            icon={heart}
            title="Prescription"
            text={cardDetails[0].text}
          />
        ) : (
          <LargeCardWithChildren
            wd="648px"
            hg="761px"
            icon={heart}
            title="Prescription"
            text={cardDetails[1].text}
            btn={true}
          >
            {prescriptionsList?.content.map((prescription) => (
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
              />
            ))}
            <Button
              wd="50px"
              hg="50px"
              color="secondary"
              className={stylelo.presBtn}
            >
              View all prescription{' '}
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
        {getAllAppointments?.content?.length > 0 ? (
          <LargeCardWithChildren
            wd="381px"
            icon={heart}
            title={`Next Appointment (${getAllAppointments?.content?.length})`}
            text={cardDetails[1].text}
            btn={true}
            hg="400px"
            overflowY={true}
          >
            {getAllAppointments?.content.map((item, i) => (
              <div key={item.id}>
                <div className={stylelo.flexRow}>
                  <div className={stylelo.sideLine}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle
                        cx="5"
                        cy="5"
                        r="4"
                        fill="white"
                        stroke={circleColorGenerator(i)}
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
                      title={`Dr. ${toFullName({
                        firstName: item?.doctor?.firstName,
                        lastName: item?.doctor?.lastName,
                      })}`}
                      date={new Date(
                        item?.appointmentDate
                      ).toLocaleDateString()}
                      item={item?.appointmentStatus}
                      time={item?.appointmentTime}
                      active={item.active}
                      color={i}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Link href={patient_routes.APPOINTMENTS}>
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
            </Link>
          </LargeCardWithChildren>
        ) : (
          <LargeCard
            wd="381px"
            icon={heart}
            hg="300px"
            title="No Appointment"
            text={cardDetails[1].text}
            btn={true}
          />
        )}
      </div>

      <div className={stylelo.flexify}>
        {pharmacyRequests?.content.length === 0 ? (
          <LargeCard
            wd="648px"
            icon={heart}
            title="Pharmacy"
            text={cardDetails[3].text}
          />
        ) : (
          <LargeCardWithChildren
            wd="648px"
            hg="471px"
            icon={heart}
            title="Pharmacy"
            text={cardDetails[1].text}
            btn={true}
          >
            {pharmacyRequests?.content.map((pharm) => (
              <PharmacyCard
                key={pharm.id}
                wd="511px"
                hg="84px"
                title="Pharmacy"
                name={pharm.name}
                hospital={pharm.hospital}
                status={pharm.status}
              />
            ))}
          </LargeCardWithChildren>
        )}

        {labRequests?.content.length === 0 ? (
          <LargeCard
            wd="381px"
            icon={heart}
            title="Laboratory"
            text={cardDetails[2].text}
          />
        ) : (
          <LargeCardWithChildren
            wd="381px"
            hg="100%"
            icon={heart}
            title="Laboratory"
            text={cardDetails[1].text}
            btn={true}
            smallBtn={true}
          >
            {labRequests?.content.map((lab) => (
              <div key={lab.id} className={stylelo.flexRow2}>
                <div className={stylelo.appCardLab}>
                  <LabCard
                    wd="302px"
                    hg="99px"
                    title={lab.title}
                    name={lab.name}
                    date={lab.date}
                    hospital={lab.hospital}
                    time={lab.time}
                  />
                </div>
              </div>
            ))}
          </LargeCardWithChildren>
        )}
      </div>
      <div className={stylelo.flexify}></div>
    </>
  )
}

export default PatientDashboard
