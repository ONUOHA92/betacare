/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'

import SubAppointmentCard from 'containersDoctors/SubAppointmentCard'
import Button from 'componentsDoctors/Button'
import PlainTable from 'componentsDoctors/Table'
import Pagination from 'componentsDoctors/Pagination'
import styles from './style.module.css'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { routes_doctor } from 'utils/routes'

import CalendarWithNote from 'componentsDoctors/CalendarWithNote'
import LargeCardWithChildren from 'componentsDoctors/LargeCardWithChildren'
import doctor from 'public/images/icons/doctor2.svg'
import heart from 'public/images/icons/heart.svg'
import chain from 'public/images/icons/chain.svg'
import { cardDetailsDoc, req_appointments_doc } from 'utils/mocking_data'

import AppointmentDateTime from 'containersDoctors/AppointmentDateTime'
import moment from 'moment'
import LargeCard from 'containersDoctors/LargeCard'
import capitalizeInitial from 'utils/capitalizeInitial'
import { useGetDoctorAppointment } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsUpcomingAppointment'
import { useGetDoctorRequestAppoint } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsRequestAppount'
import { useGetDocAvailability } from 'network/ReactQuery/Queries/Appointment/doctorAvailability'

const Popups = dynamic(() => import('componentsDoctors/Popup'), { ssr: false })
const ReqAppointmentCard = dynamic(
  () => import('containersDoctors/ReqAppointmentCard'),
  { ssr: false }
)
const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)

const Appointment = () => {
  const arrHeaders = ['Date', 'Who', 'Time', 'Status', 'Action', '']
  const { doctorsrequest } = useGetDoctorRequestAppoint()
  const { doctorsupAppointment, doctorsupAppointmentError } =
    useGetDoctorAppointment()
  const requestedAppointments = doctorsrequest?.data
  const upcomingAppointments = doctorsupAppointment?.data
  const { docAvailability } = useGetDocAvailability()
  const [bookAppointment, setBookAppointment] = useState(false)
  const [appointment, setAppointment] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [openTimeDate, setOpenTimeDate] = React.useState(false)
  const handleOpenTimeDate = () => setOpenTimeDate(true)
  const handleCloseTimeDate = () => setOpenTimeDate(false)

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  let notes = []
  let times = []

  docAvailability?.doctorAvailabilities?.forEach((workDay: any) => {
    notes.push(workDay.workDay)
    let duration = workDay.startTime + ' - ' + workDay.endTime
    times.push(duration)
  })

  return (
    <>
      <Head>
        <title>Appointments -- BetaCare</title>
      </Head>
      {openTimeDate && (
        <AppointmentDateTime
          open={openTimeDate}
          handleClose={handleCloseTimeDate}
        />
      )}
      <div className={styles.topHeader}>
        <div className={styles.topHeader1}>
          <div className={styles.topHeadertext1}>Appointments</div>
          <div className={styles.topHeadertext2}>
            View and set appointments with your patients
          </div>
        </div>
        {!showButton && (
          <div className={styles.topHeader2}>
            <Button
              wd="244px"
              hg="45px"
              color="secondary"
              className={!bookAppointment ? styles.firstBtn : styles.presBtn}
              onClick={() => handleOpenTimeDate()}
            >
              <span className={styles.btnText}>Set days & time</span>
            </Button>
          </div>
        )}
      </div>

      <div className={styles.calendarDoctors}>
        <CalendarWithNote
          noteDetails={notes}
          docAvailability={docAvailability?.doctorAvailabilities}
          interval={times}
        />
      </div>
      <div className={styles.appTitle}>
        Requested appointment{' '}
        <span className={styles.appTitleItem}>
          ({requestedAppointments?.totalElements})
        </span>
      </div>
      <div className={styles.overflow}>
        {requestedAppointments?.totalElements ? (
          <LargeCardWithChildren
            wd="100%"
            hg="auto"
            icon={heart}
            title=""
            text={cardDetailsDoc[1].text}
            btn={true}
            alignTitle={true}
          >
            <div className={styles.flexxyDoc}>
              {requestedAppointments?.content?.map((appt: any) => (
                <ReqAppointmentCard
                  key={appt.id}
                  name={appt.patientName}
                  time={appt.time}
                  date={appt.date}
                  wd={'395px'}
                />
              ))}
            </div>
          </LargeCardWithChildren>
        ) : (
          <LargeCard
            wd="100%"
            hg="300px"
            icon={heart}
            flexify={true}
            text={cardDetailsDoc[0].text}
          />
        )}
      </div>
      <div className={`${styles.appTitle} ${styles.addMarginTop}`}>
        Upcoming appointment{' '}
        <span className={styles.appTitleItem}>
          ({upcomingAppointments?.totalElements})
        </span>
      </div>

      {upcomingAppointments?.totalElements ? (
        <>
          <div className={styles.tableWrapper}>
            <PlainTable
              arrHeaders={arrHeaders}
              arrRows={upcomingAppointments?.totalElements}
            />
            <br />
            {<Pagination />}
          </div>
        </>
      ) : (
        <LargeCard
          wd="100%"
          hg="300px"
          icon={heart}
          flexify={true}
          text={cardDetailsDoc[4].text}
        />
      )}
      <Popups
        isOpen={open}
        current="cancelAppointment"
        handleClose={handleClose}
      />
    </>
  )
}

Appointment.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Appointment
