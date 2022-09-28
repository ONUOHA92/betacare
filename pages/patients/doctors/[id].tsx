import Button from 'components/Button'

import styles from 'styles/pages/singledoctors.module.css'
import { Box, Rating } from '@mui/material'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Paper from 'components/Paper'
import DisplayItem from 'components/DisplayItem'
import OpeningTimeCard from 'containers/OpeningTimeCard'
import StarIcon from '@mui/icons-material/Star'
import { useSelect } from '@mui/base'
import { useRouter } from 'next/router'
import toInitials from 'utils/toInitials'
import { toFullName } from 'utils/toFullName'
import { useSingleDoctorProfile } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsprofile'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const BookAppointments = dynamic(() => import('containers/BookAppointment'), {
  ssr: false,
})

const SingleDoctor = () => {
  const [book, setBook] = useState(false)
  const router = useRouter()
  const queryId = router?.query?.id
  const { singleDoctorProfile, refetchSingleDoctorProfile, status } =
    useSingleDoctorProfile(Number(queryId))

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
                {singleDoctorProfile?.profilePics && (
                  <div className={styles.imgContainer}>
                    <img
                      src={singleDoctorProfile?.profilePics}
                      alt={toFullName({
                        firstName: singleDoctorProfile?.firstName,
                        lastName: singleDoctorProfile?.lastName,
                      })}
                    />
                  </div>
                )}
                {!singleDoctorProfile?.profilePics && (
                  <div className={styles.imgContainer}>
                    <p>
                      {toInitials(
                        toFullName({
                          firstName: singleDoctorProfile?.firstName,
                          lastName: singleDoctorProfile?.lastName,
                        })
                      )}
                    </p>
                  </div>
                )}
                <div className={styles.details}>
                  <h2>
                    {toFullName({
                      firstName: singleDoctorProfile?.firstName,
                      lastName: singleDoctorProfile?.lastName,
                    })}
                  </h2>
                  <p>{singleDoctorProfile?.speciality}</p>
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
                {singleDoctorProfile?.bio ? (
                  <DisplayItem
                    icon="/images/patient/doctor.svg"
                    headding="About doctor"
                    smallText={singleDoctorProfile?.bio}
                  />
                ) : (
                  <DisplayItem
                    icon="/images/patient/doctor.svg"
                    headding="About doctor"
                    smallText="N/A"
                  />
                )}
                {singleDoctorProfile?.joinedTime ? (
                  <DisplayItem
                    icon="/images/patient/calendar.svg"
                    headding="Joined time"
                    smallText={singleDoctorProfile?.duration}
                  />
                ) : (
                  <DisplayItem
                    icon="/images/patient/calendar.svg"
                    headding="Joined time"
                    smallText="N/A"
                  />
                )}
                {singleDoctorProfile?.experience ? (
                  <DisplayItem
                    icon="/images/patient/experience.svg"
                    headding="Experience"
                    smallText={singleDoctorProfile?.experienceYear}
                  />
                ) : (
                  <DisplayItem
                    icon="/images/patient/experience.svg"
                    headding="Experience"
                    smallText="N/A"
                  />
                )}
                {singleDoctorProfile?.patientsTreated ? (
                  <DisplayItem
                    icon="/images/patient/patient.svg"
                    headding="Patients treated"
                    smallText="145 patients"
                  />
                ) : (
                  <DisplayItem
                    icon="/images/patient/patient.svg"
                    headding="Patients treated"
                    smallText="N/A"
                  />
                )}
                {singleDoctorProfile?.language ? (
                  <DisplayItem
                    icon="/images/patient/language.svg"
                    headding="Language"
                    smallText="English"
                  />
                ) : (
                  <DisplayItem
                    icon="/images/patient/language.svg"
                    headding="Language"
                    smallText="N/A"
                  />
                )}
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
