import React, { useState } from 'react'
import BlankCardModal from 'components/BlankCardModal'
import styles from './style.module.css'
import Input from 'components/Input'
import Button from 'components/Button'
import SubAdminAccess from 'containers/SubAdminAccess'
type SubAdminProps = {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}
const AddSubAdmin = ({ openModal, setOpenModal }: SubAdminProps) => {
  const [openAccessModal, setOpenAccessModal] = useState(false)

  const handleAccessModal = () => {
    setOpenAccessModal(true)
    // setTimeout(() => {
    //   setOpenModal(false)
    // }, 1000)
  }
  return (
    <>
      {openAccessModal && (
        <SubAdminAccess
          openAccessModal={openAccessModal}
          setOpenAccessModal={setOpenAccessModal}
        />
      )}

      <BlankCardModal
        wd="661px"
        hg="695px"
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <div className={styles.addSubAdmin}>
          <div className={styles.addSubAdmin__header}>
            Fill the form to add a sub admin
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>First name</div>
            <Input placeholder="First name" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Last name</div>
            <Input placeholder="Last name" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Email</div>
            <Input placeholder="Email" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Phone Number</div>
            <Input placeholder="Phone number" />
          </div>
          <Button
            color="secondary"
            className={styles.presBtn}
            onClick={handleAccessModal}
          >
            Continue
          </Button>
        </div>
      </BlankCardModal>
    </>
  )
}

export default AddSubAdmin
