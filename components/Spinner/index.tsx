import React from 'react'
import styles from './style.module.css'

type Props = {
  big?: boolean
}

const Spinner = ({ big }: Props) => {
  return (
    <div
      className={big ? `${styles.loading} ${styles.big}` : styles.loading}
      data-testid="spinner"
    ></div>
  )
}

export default Spinner
