/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState } from 'react'
import Button from 'components/Button'
import styles from './style.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import LargeCard from 'containers/LargeCard'
import heart from 'public/images/icons/heart.svg'
import AppointmentTable from 'containers/Tables/AppointmentTable'
import { useAllDoctorAppointment } from 'network/ReactQuery/Queries/Appointment/useAllAppointment'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const SubAppointmentCard = dynamic(
  () => import('containers/SubAppointmentCard'),
  {
    ssr: false,
  }
)
const Popups = dynamic(() => import('components/Popup'), { ssr: false })
const Appointment = () => {
  const arrHeaders = ['Date', 'Who', 'Time', 'Status']
  const [pageNumber, setPageNumber] = useState(0)
  const { getAllAppointments, refetchAllAppointments } =
    useAllDoctorAppointment(pageNumber)
  const [bookAppointment, setBookAppointment] = useState(false)
  const [appointmentId, setAppointmentId] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const enableAppointment = () => {
    setShowButton(false)
  }

  const handleAppointmentCTA = () => {
    setShowButton(true)
    setBookAppointment(true)
  }

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleCancelCTA = () => {
    setOpen(true)
  }

  useEffect(() => {
    refetchAllAppointments()
  }, [pageNumber, refetchAllAppointments])

  return (
    <>
      <Head>
        <title>Appointments -- BetaCare</title>
      </Head>
      <div className={styles.topHeader}>
        <div className={styles.topHeader1}>
          <div className={styles.topHeadertext1}>Appointments</div>
        </div>

        {!showButton && (
          <div className={styles.topHeader2}>
            <Button
              wd="244px"
              hg="45px"
              color="secondary"
              className={!bookAppointment ? styles.firstBtn : styles.presBtn}
              onClick={() => handleAppointmentCTA()}
            >
              Book appointment
            </Button>
          </div>
        )}
      </div>
      {!bookAppointment ? (
        getAllAppointments?.content?.length > 0 ? (
          <>
            <div className={styles.tableWrapper}>
              <AppointmentTable
                arrHeaders={arrHeaders}
                arrRows={getAllAppointments}
                setPageNumber={setPageNumber}
                handleCancelCTA={handleCancelCTA}
                setAppointmentId={setAppointmentId}
              />
            </div>
          </>
        ) : (
          <div className={`${styles.tableWrapper} ${styles.moveTopUp}`}>
            <LargeCard hg="300px" icon={heart} text="No Appointments Yet" />
          </div>
        )
      ) : (
        <SubAppointmentCard />
      )}
      <Popups
        isOpen={open}
        current="cancelAppointment"
        appointmentId={appointmentId}
        handleClose={handleClose}
      />
    </>
  )
}

Appointment.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Appointment
