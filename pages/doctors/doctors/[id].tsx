import Button from 'componentsDoctors/Button'

import styles from 'styles/pages/singledoctors.module.css'
import { Box, Rating } from '@mui/material'
import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Paper from 'componentsDoctors/Paper'
import DisplayItem from 'componentsDoctors/DisplayItem'
import OpeningTimeCard from 'containersDoctors/OpeningTimeCard'
import StarIcon from '@mui/icons-material/Star'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)

const BookAppointments = dynamic(
  () => import('containersDoctors/BookAppointment'),
  { ssr: false }
)

const options = [
  'Gynaecologist',
  'Paediatrician',
  'Oncologist',
  'Therapist',
  ' Orthodontist',
  'Oculist',
  'Psychiatrist',
  'ENT',
  'Dentist',
]

const SingleDoctor = () => {
  const [book, setBook] = useState(false)
  const handleChange = (e) => {}

  return (
    <>
      <Head>
        <title>Doctors | Betacare</title>
      </Head>
      <div className={styles.wrapper}>
        <header>
          <div className={styles.text}>
            <h2>Doctors</h2>
            <p>Search for doctors near you and get help with anything</p>
          </div>
        </header>
        <section className={styles.card}>
          <Paper>
            <div className={styles.cardWrapper}>
              <div className={styles.info}>
                <div className={styles.imgContainer}>
                  <img src="/images/aniebet.png" alt="" />
                </div>
                <div className={styles.details}>
                  <h2>Aniebiet Ubaha</h2>
                  <p>General Practitioner (MB;BS)</p>
                  <Button color="primary" onClick={() => setBook(true)}>
                    Book appointment
                  </Button>
                </div>
              </div>
              <div>
                <Box
                  sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating
                    value={4.8}
                    precision={0.1}
                    readOnly
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{4.8}</Box>
                </Box>
                <p>145 reviews</p>
              </div>
            </div>
          </Paper>
        </section>
        <section className={styles.grid}>
          <div>
            <Paper>
              <div className={styles.items}>
                <DisplayItem
                  icon="/images/patient/doctor.svg"
                  headding="About doctor"
                  smallText="Reader. Writer. Doctor."
                />
                <DisplayItem
                  icon="/images/patient/calendar.svg"
                  headding="Joined time"
                  smallText="12/06/2021"
                />
                <DisplayItem
                  icon="/images/patient/experience.svg"
                  headding="Experience"
                  smallText="5years"
                />
                <DisplayItem
                  icon="/images/patient/patient.svg"
                  headding="Patients treated"
                  smallText="145 patients"
                />
                <DisplayItem
                  icon="/images/patient/language.svg"
                  headding="Language"
                  smallText="English"
                />
              </div>
            </Paper>
          </div>
          <div>
            <Paper>
              {!book && <OpeningTimeCard opening_times={opening_times} />}
              {book && <BookAppointments />}
            </Paper>
          </div>
        </section>
      </div>
    </>
  )
}

SingleDoctor.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default SingleDoctor

const opening_times = [
  {
    day: 'Monday',
    time: '8:00am - 5:00pm',
  },
  {
    day: 'Tuesday',
    time: '8:00am - 5:00pm',
  },
  {
    day: 'Wednesday',
    time: '8:00am - 5:00pm',
  },
  {
    day: 'Thursday',
    time: '8:00am - 5:00pm',
  },
  {
    day: 'Friday',
    time: '8:00am - 5:00pm',
  },
]
