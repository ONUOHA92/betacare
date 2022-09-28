// @ts-nocheck
import React, { useState } from 'react'
import styles from './style.module.css'
import BlankCardLarge from 'componentsDoctors/BlankCardLarge'
import BlankCardModal from 'componentsDoctors/BlankCardModal'
import Input from 'componentsDoctors/Input'
import { Select } from '@mui/material'
import Button from 'componentsDoctors/Button'
import SelectLaboratoryCard from 'containersDoctors/SelectLaboratoryCard'
import InChatAppointmentModal from 'containersDoctors/InChatAppointmentModal'
import GoogleApiWrapper from 'componentsDoctors/Maps'

interface Props {
  openAppointment?: boolean
  handleClose?: () => void
}

function SelectLabAndMapCard({
  openAppointment,
  handleClose,
}: React.PropsWithChildren<Props>) {
  const [step2, setStep2] = useState(false)

  return (
    <>
      {!step2 ? (
        <BlankCardModal
          open={openAppointment}
          handleClose={handleClose}
          wd={'661px'}
          hg={'680px'}
        >
          <form className={styles.formContainerForm}>
            <div className={styles.formTopp}></div>
            <div className={styles.topText}>
              Please fill the form to book an appointment
            </div>
            <div className={styles.searchBox}>
              <input
                placeholder={'Search by Laboratory, Speciality...'}
                className={styles.searchField}
              />
            </div>
            <br />
            <div className={styles.mapWrapper}>
              <GoogleApiWrapper />
            </div>
            <br />
            <SelectLaboratoryCard fullWidth={true} />
            <Button
              type="submit"
              hg="50px"
              color="primary"
              className={styles.presBtn}
              onClick={() => setStep2(true)}
            >
              Continue
            </Button>
          </form>
        </BlankCardModal>
      ) : (
        <BlankCardModal
          open={openAppointment}
          handleClose={handleClose}
          wd={'661px'}
          hg={'680px'}
        >
          <InChatAppointmentModal handleClose={handleClose} />
        </BlankCardModal>
      )}
    </>
  )
}

export default SelectLabAndMapCard
