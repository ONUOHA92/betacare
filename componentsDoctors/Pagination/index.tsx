import * as React from 'react'
import styles from './style.module.css'

interface Props {}

// This should be modified when dynamic data is present
export default function PlainTable({}: React.PropsWithChildren<Props>) {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationLeft}>Show page 1 of 20</div>
      <div className={styles.paginationRight}>
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.25 10.5L1.75 6L6.25 1.5"
            stroke="#1E223E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.siblings}>
          <span className={styles.active}>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
        <div className={styles.dashes}>......</div>
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.75 10.5L6.25 6L1.75 1.5"
            stroke="#1E223E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
