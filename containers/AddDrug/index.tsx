import BlankCardModal from 'components/BlankCardModal'
import Button from 'components/Button'
import Input from 'components/Input'
import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import Upload from 'public/images/icons/upload.svg'

type AddDrugProps = {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}
const AddDrug = ({ openModal, setOpenModal }: AddDrugProps) => {
  return (
    <>
      <BlankCardModal
        wd="561px"
        hg="657px"
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <div className={styles.addDrug}>
          <div className={styles.addDrug__header}>
            Fill the form to add a drug
          </div>
          <div className={styles.dropBox}>
            <div className={styles.drag}>
              <p>Drag and drop image here</p>
            </div>
            <Button color="secondary" className={styles.presBtn}>
              <Image src={Upload} width={17.53} height={16.5} alt="upload" />
              Upload
            </Button>
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Drug name</div>
            <Input placeholder="Panadol" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Price</div>
            <Input placeholder="N500.00" />
          </div>
          <div className={styles.info}>
            <div className={styles.info__label}>Strenght</div>
            <Input placeholder="150ml" />
          </div>
          <Button color="secondary" className={styles.firstBtn}>
            Save
          </Button>
        </div>
      </BlankCardModal>
    </>
  )
}

export default AddDrug
