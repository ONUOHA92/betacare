import BlankCardModal from 'components/BlankCardModal'
import React from 'react'
import styles from './style.module.css'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import Button from 'components/Button'

type AccessProps = {
  openAccessModal: boolean
  setOpenAccessModal: (openAccessModal: boolean) => void
}
const SubAdminAccess = ({
  openAccessModal,
  setOpenAccessModal,
}: AccessProps) => {
  return (
    <>
      <BlankCardModal
        wd="561px"
        hg="556px"
        open={openAccessModal}
        handleClose={() => setOpenAccessModal(false)}
      >
        <div className={styles.access}>
          <div className={styles.access__header}>Add Access</div>
          <div className={styles.access_box}>
            <Chip
              label="Accept doctors request"
              className={styles.access__chip}
            />
            <Chip label="Add products" className={styles.access__chip} />
            <Chip label="Add sub admins" className={styles.access__chip} />
            <Chip
              label="Add third party users"
              className={styles.access__chip}
            />
          </div>
          <div className={styles.access__tray}>
            <Chip
              label="Add Sub admins"
              icon={<AddIcon className={styles.sum} />}
              className={styles.access__add}
            />
            <Chip
              label="Accept doctors request"
              icon={<AddIcon className={styles.sum} />}
              className={styles.access__add}
            />
            <Chip
              label="Accept doctors request"
              icon={<AddIcon className={styles.sum} />}
              className={styles.access__add}
            />
            <Chip
              label="Add Sub admins"
              icon={<AddIcon className={styles.sum} />}
              className={styles.access__add}
            />
          </div>
          <Button color="secondary" className={styles.presBtn}>
            Save
          </Button>
        </div>
      </BlankCardModal>
    </>
  )
}

export default SubAdminAccess
