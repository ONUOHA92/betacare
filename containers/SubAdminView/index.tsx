import React, { useState } from 'react'
import BlankCardModal from 'components/BlankCardModal'
import styles from './style.module.css'
import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Button from 'componentsDoctors/Button'
import Chip from '@mui/material/Chip'
import ClearIcon from '@mui/icons-material/Clear'

type SubAdminViewProps = {
  openSubAdminModal: boolean
  setOpenSubAdminModal: (openSubAdminModal: boolean) => void
}
const SubAdminView = ({
  openSubAdminModal,
  setOpenSubAdminModal,
}: SubAdminViewProps) => {
  const [edit, setEdit] = useState(false)
  return (
    <>
      <BlankCardModal
        wd="1037px"
        hg="514px"
        open={openSubAdminModal}
        handleClose={() => setOpenSubAdminModal(false)}
      >
        <div className={styles.subAdminBox}>
          <div className={styles.personal__view}>
            <div className={styles.heading}>
              <div className={styles.heading__text}>Personnel details</div>
            </div>
            <div className={styles.personnnel__info}>
              <div className={styles.info__left}>First name</div>
              <div className={styles.info__right}>Teejay</div>
            </div>
            <div className={styles.personnnel__info}>
              <div className={styles.info__left}>Last name</div>
              <div className={styles.info__right}>Teko</div>
            </div>
            <div className={styles.personnnel__info}>
              <div className={styles.info__left}>Email</div>
              <div className={styles.info__right}>Teejay@gmail.com</div>
            </div>
            <div className={styles.personnnel__info}>
              <div className={styles.info__left}>Phone number</div>
              <div className={styles.info__right}>080123456789</div>
            </div>
          </div>
          <div className={styles.access}>
            <div className={styles.heading}>
              <div className={styles.heading__text}>Access</div>
              {!edit && (
                <IconButton>
                  <EditOutlinedIcon />
                </IconButton>
              )}
            </div>
            <div className={styles.access__tray}>
              <Chip
                label="Accept doctors request"
                className={styles.access__chip}
                icon={
                  edit ? (
                    <IconButton>
                      <ClearIcon className={styles.clear} />
                    </IconButton>
                  ) : null
                }
              />
              <Chip
                label="Add Products"
                className={styles.access__chip}
                icon={
                  edit ? (
                    <IconButton>
                      <ClearIcon className={styles.clear} />
                    </IconButton>
                  ) : null
                }
              />
              <Chip
                label="Add Sub admins"
                className={styles.access__chip}
                icon={
                  edit ? (
                    <IconButton>
                      <ClearIcon className={styles.clear} />
                    </IconButton>
                  ) : null
                }
              />
              <Chip
                label="Add third party users"
                className={styles.access__chip}
                icon={
                  edit ? (
                    <IconButton>
                      <ClearIcon className={styles.clear} />
                    </IconButton>
                  ) : null
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button
            color="secondary"
            className={!edit ? styles.presBtn : styles.button__save}
            onClick={() => setEdit(true)}
          >
            {edit ? 'Save' : 'Edit Access'}
          </Button>
          <Button color="secondary" className={styles.presBtn2} disabled={edit}>
            Deactivate
          </Button>
        </div>
      </BlankCardModal>
    </>
  )
}

export default SubAdminView
