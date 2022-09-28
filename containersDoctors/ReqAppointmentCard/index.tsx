import React, { useState, useEffect } from 'react'
import styles from './style.module.css'
import request from 'public/images/mock/request.png'
import Image from 'next/image'
// import Button from 'components/Button'
import Button from '@mui/material/Button'
import Popups from 'componentsDoctors/Popup'
import { useGetDoctorRequestAppoint } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsRequestAppount'
import { useSetDoctorAppointmentStatus } from 'network/ReactQuery/Mutations/Appointment/updateAppoinmentStatus'
import { useGetDoctorAppointment } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsUpcomingAppointment'

interface Props {
  key?: string
  name?: string
  time?: string
  date?: string
  wd?: string
}

const Index = ({ date, time, name, wd }) => {
  const { doctorsrequest, doctorsrequestRefetch } = useGetDoctorRequestAppoint()
  const requestedAppointments = doctorsrequest?.data
  const id = requestedAppointments?.content[0].id
  const { setDoctorAppointmentStatus } = useSetDoctorAppointmentStatus()
  let preferredGap
  if (wd) {
    preferredGap = 150
  }

  const [open, setOpen] = useState(false)

  const handleStatusUpdate = () => {
    const credentials = {
      appointmentId: id,
      status: 'accepted',
    }

    setDoctorAppointmentStatus(credentials).then(() => doctorsrequestRefetch())
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={`${styles.mainContainer}`} style={{ width: wd }}>
      <div className={styles.flem1}>
        <div className={styles.flem1a}>
          <Image src={request} alt="avatar" className={styles.flem1a} />
        </div>

        <div className={styles.flem2}>
          <div className={styles.flem2sob} style={{ gap: preferredGap }}>
            <div className={styles.flem2a}>{name}</div>
            <div className={styles.flem3}>{date}</div>
          </div>

          <div className={styles.flem2b}>{time}</div>
        </div>
      </div>

      <div className={styles.flem4}>
        <Button
          className={styles.flem4a}
          onClick={() => {
            handleStatusUpdate()
          }}
        >
          Accept
        </Button>
        <Button
          className={styles.flem4b}
          onClick={() => {
            setOpen(true)
          }}
        >
          Decline
        </Button>
      </div>
      <Popups
        isOpen={open}
        current="cancelAppointment"
        title="Reasons for decline"
        handleClose={handleClose}
      />
    </div>
  )
}

export default Index
