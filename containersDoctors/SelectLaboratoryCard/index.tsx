import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import doctor from 'public/images/mock/doctor-girl.png'
import { Link } from '@mui/material'
import { useRouter } from 'next/router'

interface Props {
  fullWidth?: boolean
}

const SelectLaboratoryCard = ({
  fullWidth,
}: React.PropsWithChildren<Props>) => {
  const LABORATORY = [
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

  //for demo
  const router = useRouter()

  const navigate = () => {
    router.push('/doctors/laboratory/location/1')
  }

  return (
    <div
      className={`${styles.mainBackground} ${
        fullWidth ? styles.fullWidth : ''
      }`}
    >
      <div className={styles.headText}>Select a Laboratory</div>

      <div className={styles.card}>
        {LABORATORY?.map((lab) => (
          <a key={lab.id} onClick={() => navigate()}>
            <div
              className={`${styles.doctorCard} ${
                fullWidth ? styles.moveLeft : ''
              }`}
            >
              <div className={styles.flexify}>
                <img src="/images/pharm_img.svg" alt="" />
              </div>
              <div className={styles.flexify}>
                <span className={styles.name}>{lab.name}</span>
                <span className={`${styles.smallText} ${styles.address}`}>
                  {lab.address}
                </span>
                <span className={styles.smallText}>{lab.phone}</span>
                <Link underline="hover" className={styles.smallText}>
                  Directions
                </Link>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default SelectLaboratoryCard
