import Input from 'componentsDoctors/Input'
import BlankCardModal from 'componentsDoctors/BlankCardModal'
import Button from 'componentsDoctors/Button'
import EmergencyCard from 'containersDoctors/EmergencyCard'
import React, { useState } from 'react'
import styles from './style.module.css'
import { MenuItem, Select } from '@mui/material'

const EmergencyContact = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'680px'}
      >
        <form className={styles.formContainerForm}>
          <div className={styles.formTopp}></div>
          <div className={styles.topText}>
            Please fill the form to add new sub users
          </div>

          <br />
          <Input label="First Name" placeholder="Teejay" />
          <br />
          <Input label="Last Name" placeholder="Teko" />
          <br />
          <Input label="Email" placeholder="Teko@example.com" />
          <br />
          <Input label="Phone number" placeholder="+234 80123456789" />
          <br />
          <Button
            type="submit"
            hg="50px"
            color="primary"
            className={styles.presBtn}
          >
            Save
          </Button>
        </form>
      </BlankCardModal>
      <div className={styles.formContainer}>
        <div className={styles.formContainerForm}>
          <div className={styles.header} onClick={handleOpen}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.75 1.125C9.75 0.826631 9.63147 0.540483 9.42049 0.329505C9.20952 0.118526 8.92337 0 8.625 0C8.32663 0 8.04048 0.118526 7.8295 0.329505C7.61853 0.540483 7.5 0.826631 7.5 1.125V7.5H1.125C0.826631 7.5 0.540483 7.61853 0.329505 7.8295C0.118526 8.04048 0 8.32663 0 8.625C0 8.92337 0.118526 9.20952 0.329505 9.42049C0.540483 9.63147 0.826631 9.75 1.125 9.75H7.5V16.125C7.5 16.4234 7.61853 16.7095 7.8295 16.9205C8.04048 17.1315 8.32663 17.25 8.625 17.25C8.92337 17.25 9.20952 17.1315 9.42049 16.9205C9.63147 16.7095 9.75 16.4234 9.75 16.125V9.75H16.125C16.4234 9.75 16.7095 9.63147 16.9205 9.42049C17.1315 9.20952 17.25 8.92337 17.25 8.625C17.25 8.32663 17.1315 8.04048 16.9205 7.8295C16.7095 7.61853 16.4234 7.5 16.125 7.5H9.75V1.125Z"
                fill="black"
              />
            </svg>
            Add new
          </div>

          {/* <EmergencyCard active={true} />
          <EmergencyCard active={false} />
          <EmergencyCard active={false} />
          <EmergencyCard active={false} /> */}
        </div>
      </div>
    </>
  )
}

export default EmergencyContact
