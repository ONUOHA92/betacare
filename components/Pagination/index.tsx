import * as React from 'react'
import styles from './style.module.css'

interface Props {
  patientSignupLogs: any
  handlePageChange: (page: number) => void
  page: number
}

// This should be modified when dynamic data is present
export default function PlainTablePagination({
  patientSignupLogs,
  handlePageChange,
  page,
}: React.PropsWithChildren<Props>) {
  let pages = []
  for (let i = 0; i <= patientSignupLogs.totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationLeft}>
        Show page {patientSignupLogs?.number + 1}
        {/* {patientSignupLogs.totalPages + 1} */}
      </div>
      <div className={styles.paginationRight}>
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            if (page > 0) {
              handlePageChange(page - 1)
            }
          }}
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
          {pages.map((page) => {
            return (
              <span
                key={page}
                className={
                  page === patientSignupLogs?.number ? styles.active : ''
                }
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </span>
            )
          })}
        </div>
        {/* <div className={styles.dashes}>......</div> */}
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            if (page < patientSignupLogs.totalPages) {
              handlePageChange(page + 1)
            }
          }}
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
