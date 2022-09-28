/* eslint-disable @next/next/no-img-element */
import Button from 'components/Button'
import DashboardLayout from 'containers/DashboardLayout'
import styles from 'styles/pages/singledoctors.module.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Paper from 'components/Paper'
import { useRouter } from 'next/router'
import toInitials from 'utils/toInitials'
import { toFullName } from 'utils/toFullName'
import { useSingleDoctorProfile } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsprofile'
import DoctorInfo from 'containers/DoctorInfo'
import Divider from 'containers/Divider'
import BookAppointmentModal from 'containers/Modals/BookAppointmentModal'
import Skeleton from '@mui/material/Skeleton'

const SingleDoctor = () => {
  const router = useRouter()
  const queryId = router?.query?.id
  const doctorId = Number(queryId)
  const { singleDoctorProfile } = useSingleDoctorProfile(doctorId)
  const [openAppointment, setOpenAppointment] = useState(false)

  const handleCloseAppointment = () => {
    setOpenAppointment(false)
  }

  const handleBookAppointment = () => {
    setOpenAppointment(true)
  }

  return (
    <>
      <Head>
        <title>Doctors | Betacare</title>
      </Head>
      {openAppointment && (
        <BookAppointmentModal
          open={openAppointment}
          handleClose={handleCloseAppointment}
          doctorId={doctorId}
        />
      )}
      <div className={styles.wrapper}>
        <header>
          <div className={styles.topHeader1}>
            <div className={styles.topHeadertext1}>Appointments</div>
          </div>
        </header>
        <section className={styles.card}>
          <Paper className={styles.paper}>
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
                    <span className={styles.circlebadge}></span>
                  </div>
                )}

                <div className={styles.details}>
                  <h2>
                    {toFullName({
                      firstName: singleDoctorProfile?.firstName,
                      lastName: singleDoctorProfile?.lastName,
                    })}
                  </h2>
                  <p>
                    {singleDoctorProfile?.speciality} (
                    {singleDoctorProfile?.qualification})
                  </p>
                  <div className={styles.available}>Available</div>
                </div>
              </div>
            </div>
            <div className={styles.scaleWrapper}>
              <div className={styles.alignCenter}>
                <h3 className={styles.header}>About doctor</h3>
                <div className={styles.aboutDoctor}>
                  {singleDoctorProfile?.bio ? (
                    singleDoctorProfile?.bio
                  ) : singleDoctorProfile?.bio === null ? (
                    'No Bio'
                  ) : (
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  )}
                </div>
              </div>
              <div className={styles.alignCenterMid}>
                <h3 className={styles.headerDocInfo}>
                  Doctor&apos;s information
                </h3>
                <div className={styles.infoContainer}>
                  <div>
                    <DoctorInfo
                      title={'Booking Cost'}
                      value={`₦ ${singleDoctorProfile?.appointmentCost}`}
                    />
                    <DoctorInfo
                      title={'Speciality'}
                      value={singleDoctorProfile?.speciality}
                    />
                    <DoctorInfo
                      title={'Years of Experience'}
                      value={singleDoctorProfile?.experienceYear}
                    />
                  </div>
                  <div className={styles.customDivider}>
                    <Divider />
                  </div>
                  <div>
                    <DoctorInfo
                      title={'Practice number'}
                      value={singleDoctorProfile?.practiseNumber}
                    />
                    <DoctorInfo
                      title={'Qualification'}
                      value={singleDoctorProfile?.qualification}
                    />
                    <DoctorInfo title={'Languages'} value={'English'} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.buttonBottom}>
              <Button
                color="primary"
                wd={'330px'}
                onClick={() => handleBookAppointment()}
              >
                Book doctor
              </Button>
            </div>
          </Paper>
        </section>
      </div>
    </>
  )
}

SingleDoctor.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default SingleDoctor
