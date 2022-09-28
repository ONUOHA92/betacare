import { Pagination } from '@mui/material'
import PlainTable from 'components/Table'
import Image from 'next/image'

import styles from 'styles/pages/doctors.module.css'

import { useState } from 'react'
import ThirdPartyTable from 'components/ThirdPartyTable'

type ThirdPartyListProps = {
  setState: any
}
const ThirdPartyList = ({ setState }: ThirdPartyListProps) => {
  const arrHeaders = ['Company', 'Category', 'Email', 'Phone Number', 'Action']
  const arrRows = [
    {
      company: `
      Mainland Hospital Yaba`,
      category: `
      Pharmacy`,
      email: 'teejay@example.com',
      phoneNumber: '08181432180',
      thirdParty: '',
    },
    {
      company: `
        Mainland Hospital Yaba`,
      category: `Laboratory`,
      email: 'teejay@example.com',
      phoneNumber: '08181432180',
      thirdParty: '',
    },
    {
      company: `
      Mainland Hospital Yaba`,
      category: `
      Pharmacy`,
      email: 'teejay@example.com',
      phoneNumber: '08181432180',
      thirdParty: '',
    },
    {
      company: `
        Mainland Hospital Yaba`,
      category: `Laboratory`,
      email: 'teejay@example.com',
      phoneNumber: '08181432180',
      thirdParty: '',
    },
  ]
  return (
    <>
      <ThirdPartyTable
        arrHeaders={arrHeaders}
        arrRows={arrRows}
        setState={setState}
        admin={true}
      />
      <div className={styles.counts}>
        <div className={styles.show}>
          <p>Show page 1 of 20</p>
        </div>
        <div className={styles.pagination}>
          <Pagination
            count={7}
            shape="rounded"
            siblingCount={0}
            size="small"
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#D4D5DB',
              },
              '& .MuiPaginationItem-root': {
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: '21px',
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ThirdPartyList
