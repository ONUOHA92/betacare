import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import doctor from 'public/images/mock/doctor-girl.png'
import { Link } from '@mui/material'

const SelectPharmacyCard = ({ setState }) => {
  const PHARMACY = [
    {
      id: '1',
      name: 'Mainland Hospital Yaba',
      address: 'Mainland Hospital Rd, Yaba 100001, Lagos',
      phone: '08012345678',
    },
    {
      id: '2',
      name: 'Mainland Hospital Yaba',
      address: 'Mainland Hospital Rd, Yaba 100001, Lagos',
      phone: '08012345678',
    },
    {
      id: '3',
      name: 'Mainland Hospital Yaba',
      address: 'Mainland Hospital Rd, Yaba 100001, Lagos',
      phone: '08012345678',
    },
    {
      id: '4',
      name: 'Mainland Hospital Yaba',
      address: 'Mainland Hospital Rd, Yaba 100001, Lagos',
      phone: '08012345678',
    },
    {
      id: '5',
      name: 'Mainland Hospital Yaba',
      address: 'Mainland Hospital Rd, Yaba 100001, Lagos',
      phone: '08012345678',
    },
  ]
  return (
    <div className={styles.mainBackground}>
      <div className={styles.headText}>Select a Pharmacy</div>

      <div
        className={styles.card}
        role={'button'}
        onClick={() => setState('drugs')}
      >
        {PHARMACY?.map((pharmacy) => (
          <div key={pharmacy.id} className={styles.doctorCard}>
            <div className={styles.flexify}>
              <img src="/images/pharm_img.svg" alt="" />
            </div>
            <div className={styles.flexify}>
              <span className={styles.name}>{pharmacy.name}</span>
              <span className={`${styles.smallText} ${styles.address}`}>
                {pharmacy.address}
              </span>
              <span className={styles.smallText}>{pharmacy.phone}</span>
              <Link underline="hover" className={styles.smallText}>
                Directions
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectPharmacyCard
