import React, { useEffect, useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import bookIcon from 'public/images/patient/bookedIcon.svg'
import purchaseIcon from 'public/images/patient/icon-purchase-success.svg'
import styles from './style.module.css'
import BookSuccess from 'components/DynamicPopups/BookSuccess'
import CancelAppointment from 'components/DynamicPopups/CancelAppointment'
import AmbulanceRequest from 'components/DynamicPopups/AmbulanceRequest'
import VerifyEmail from 'components/DynamicPopups/VerifyEmail'
import VerifyEmailSuccess from 'components/DynamicPopups/VerifyEmailSuccess'
import LogOut from 'components/DynamicPopups/LogOut'
import RequestPasswordSuccess from 'components/DynamicPopups/RequestPasswordSuccess'
import CancelPlan from 'components/DynamicPopups/CancelPlan'
import AdminDoctorDoc from 'components/DynamicPopups/AdminDoctorDoc'
import { CLOSE_SVG } from 'assets/icon'
import Image from 'next/image'
import RejectDoctorRequest from 'components/DynamicPopups/RejectDoctorRequestModal'

type Props = {
  isOpen: boolean
  appointmentId?: string | number
  current: String
  text?: string
  sensitivePassword?: String
  handleClose: () => void
  handleAction?: () => void
  file?: string
  doctorId?: number
  setOpenModal?: (open: boolean) => void
}

const Popups = ({
  isOpen,
  current,
  handleClose,
  handleAction,
  sensitivePassword,
  text,
  appointmentId,
  file,
  doctorId,
  setOpenModal,
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
              successText={`you've booked your appointment`}
              date={text}
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
          {current === 'rejectDoctorRequest' && (
            <RejectDoctorRequest
              doctorId={doctorId}
              setOpenModal={setOpenModal}
            />
          )}
          {current === 'cancelAppointment' && (
            <CancelAppointment
              appointmentId={appointmentId}
              handleClose={handleClose}
            />
          )}

          {current === 'ambulanceRequest' && <AmbulanceRequest />}
          {current === 'verifyEmail' && (
            <VerifyEmail handleClose={handleClose} />
          )}
          {current === 'doctorDocument' && (
            <AdminDoctorDoc handleClose={handleClose} file={file} />
          )}
          {current === 'verifyEmailSuccess' && (
            <VerifyEmailSuccess handleClose={handleClose} />
          )}
          {current === 'cancelPlanSuccess' && (
            <BookSuccess
              icon={purchaseIcon}
              successText={'Plan cancelled successfully'}
              secondaryText={'Your plan has been sucessfully cancelled.'}
            />
          )}
          {current === 'logout' && <LogOut handleClose={handleClose} />}
          {current === 'cancelPlan' && (
            <CancelPlan handleClose={handleClose} handleAction={handleAction} />
          )}
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
