import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import bookIcon from 'public/images/patient/bookedIcon.svg'
import purchaseIcon from 'public/images/patient/icon-purchase-success.svg'
import { Popup } from 'types/popupTypes'
import styles from './style.module.css'
import BookSuccess from 'componentsDoctors/DynamicPopups/BookSuccess'
import CancelAppointment from 'componentsDoctors/DynamicPopups/CancelAppointment'
import AmbulanceRequest from 'componentsDoctors/DynamicPopups/AmbulanceRequest'
import VerifyEmail from 'componentsDoctors/DynamicPopups/VerifyEmail'
import VerifyEmailSuccess from 'componentsDoctors/DynamicPopups/VerifyEmailSuccess'
import LogOut from 'components/DynamicPopups/LogOut'
import RequestPasswordSuccess from 'componentsDoctors/DynamicPopups/RequestPasswordSuccess'
import { CLOSE_SVG } from 'assets/icon'
import Image from 'next/image'
import RejectDoctorRequest from 'componentsDoctors/DynamicPopups/RejectDoctorRequest'

type Props = {
  isOpen: boolean
  current: String
  title?: string
  sensitivePassword?: String
  handleClose: () => void
}

const Popups = ({
  isOpen,
  current,
  handleClose,
  sensitivePassword,
  title,
}: Props) => {
  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isOpen])
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          padding: { xs: '1em', sm: '2em' },
          width: { xs: '95vw', sm: '80vw', md: '50vw' },
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title" className={styles.wrapper}>
        <IconButton className={styles.customizedbutton} onClick={handleClose}>
          <Image src={CLOSE_SVG} alt="close" layout="fill" />
        </IconButton>
      </DialogTitle>
      <div className={styles.maincontainer}>
        <DialogContent ref={descriptionElementRef} tabIndex={-1}>
          {current === 'bookSuccess' && (
            <BookSuccess
              icon={bookIcon}
              successText={'Teejay, you’ve booked your appointment'}
              secondaryText={
                'You will get a notification once your appointment has been confirmed'
              }
            />
          )}
          {current === 'purchaseSuccess' && (
            <BookSuccess
              icon={purchaseIcon}
              successText={'Thank you for your purchase.'}
              secondaryText={
                'You will get a notification once your order is ready.'
              }
            />
          )}
          {current === 'cancelAppointment' && (
            <CancelAppointment title={title} />
          )}
          {current === 'rejectDoctorRequest' && (
            <RejectDoctorRequest title={title} />
          )}
          {current === 'ambulanceRequest' && <AmbulanceRequest />}
          {current === 'verifyEmail' && (
            <VerifyEmail handleClose={handleClose} />
          )}
          {current === 'verifyEmailSuccess' && (
            <VerifyEmailSuccess handleClose={handleClose} />
          )}
          {current === 'logout' && <LogOut handleClose={handleClose} />}
          {current === 'requestPasswordSuccess' && (
            <RequestPasswordSuccess
              handleClose={handleClose}
              sensitivePassword={sensitivePassword}
            />
          )}
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default Popups
