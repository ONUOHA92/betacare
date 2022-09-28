import { Select, TextField } from '@mui/material'
import BlankCardModal from 'components/BlankCardModal'
import Button from 'components/Button'
import Input from 'components/Input'
import React from 'react'
import styles from './style.module.css'

type ThirdPartyProps = {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}
const AddThirdParty = ({ openModal, setOpenModal }: ThirdPartyProps) => {
  const selectOptions = [
    { value: '1', label: 'Company Type 1' },
    { value: '2', label: 'Company Type 2' },
    { value: '3', label: 'Company Type 3' },
    { value: '4', label: 'Company Type 4' },
  ]
  return (
    <>
      <BlankCardModal
        wd="936px"
        hg="732px"
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <div className={styles.addThirdParty}>
          <div className={styles.addThirdParty__header}>
            Please fill the form to add a third party company
          </div>
          <div className={styles.info}>
            <Select
              label="Company Type"
              className={styles.select}
              onChange={(e: any) => console.log(e)}
            >
              {selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Company Name</div>
            <Input placeholder="Mainland Hospital Yaba" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Email</div>
            <Input placeholder="Teko@example.com" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Phone number</div>
            <Input placeholder="080124567890" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Address</div>
            <TextField
              label="Address"
              multiline
              rows={3}
              variant="outlined"
              className={styles.textfield}
            />
          </div>
          <Button color="secondary" className={styles.firstBtn}>
            Save
          </Button>
        </div>
      </BlankCardModal>
    </>
  )
}

export default AddThirdParty
