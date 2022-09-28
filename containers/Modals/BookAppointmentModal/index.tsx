import BlankCardModal from 'componentsDoctors/BlankCardModal'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import AppointmentCalender from 'containers/AppointmentCalendar'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'

interface Props {
  open?: boolean
  doctorId: number
  handleClose?: () => void
}

const BookAppointmentModal = ({
  open,
  doctorId,
  handleClose,
}: React.PropsWithChildren<Props>) => {
  const [bookingEligibility, setBookingEligibility] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const potentialPaystackLink = bookingEligibility?.paystackPaymentLink
    const checkIfPAystackLinkIsValid =
      potentialPaystackLink?.includes('checkout')
    if (checkIfPAystackLinkIsValid) {
      router.push(potentialPaystackLink)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingEligibility])
  return (
    <>
      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'680px'}
      >
        <div className={styles.topText}>
          Please fill the form to book an appointment
        </div>
        {bookingEligibility && (
          <>
            <br />
            {bookingEligibility?.paystackPaymentLink && (
              <>
                <div className={styles.infoText}>
                  In case you are not redirected, copy and paste the link below
                  in the browser to continue:{' '}
                </div>
                <br />
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="info">
                    {bookingEligibility?.paystackPaymentLink
                      ? bookingEligibility?.paystackPaymentLink
                      : bookingEligibility?.message}
                  </Alert>
                </Stack>
              </>
            )}
            {bookingEligibility?.message && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{bookingEligibility?.message}</Alert>
              </Stack>
            )}
          </>
        )}

        <section className={styles.grid}>
          <div>
            <AppointmentCalender
              doctorId={doctorId}
              bookingEligibility={bookingEligibility}
              setBookingEligibility={setBookingEligibility}
            />
          </div>
        </section>
      </BlankCardModal>
    </>
  )
}

export default BookAppointmentModal
