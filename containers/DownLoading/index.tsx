import React from 'react'
import styles from './style.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

function DownLoading(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.centered}>
        <h3>Get The BetaCare App Today</h3>
        <p>
          Easily book an appointment from your phone and talk to a doctor today!
        </p>
        <div className={styles.centerButton}>
          <button className={styles.button}>
            Get the app now{' '}
            <DoubleArrowIcon
              style={{ fontSize: 'medium', paddingTop: '7px' }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownLoading
