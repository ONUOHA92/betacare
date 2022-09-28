import React from 'react'
import styles from './style.module.css'
import Skeleton from '@mui/material/Skeleton'

function DoctorInfo({ title, value }: { title: string; value: string }) {
  return (
    <div className={styles.groupTitleValue}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>
        {value ? (
          value
        ) : Number(value) === 0 ? (
          value
        ) : (
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        )}
      </div>
    </div>
  )
}

export default DoctorInfo
