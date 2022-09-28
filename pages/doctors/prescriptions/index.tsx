import Button from 'componentsDoctors/Button'

import styles from 'styles/pages/prescription.module.css'
import { MenuItem, Pagination } from '@mui/material'
import { useRef, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import PrescriptionDetail from 'componentsDoctors/PrescriptionDetail'
import PrescriptionList from 'componentsDoctors/PrescriptionList'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)
const Prescription = () => {
  const [state, setState] = useState('presciptionList')
  const printRef = useRef()

  return (
    <>
      <Head>
        <title>Prescriptions | Betacare</title>
      </Head>
      <div className={styles.wrapper}>
        <header>
          <div className={styles.text}>
            <h2>Prescriptions</h2>
            <p>Patients prescriptions</p>
          </div>
          {state === 'presciptionDetail' && (
            <div>
              <Button
                wd="244px"
                hg="45px"
                color="secondary"
                className={styles.downloadBtn}
              >
                Renew Prescription
              </Button>
            </div>
          )}
          {state !== 'presciptionDetail' && (
            <div>
              <Button
                wd="244px"
                hg="45px"
                color="secondary"
                className={styles.downloadBtn}
              >
                New Prescription
              </Button>
            </div>
          )}
        </header>
        {state === 'presciptionList' && (
          <PrescriptionList setState={setState} />
        )}
        {state === 'presciptionDetail' && (
          <div>
            <PrescriptionDetail />
          </div>
        )}
      </div>

      <style jsx>{`
        .mapWrapper {
          position: relative;
          max-width: 640px;
          height: 503px;
          border-radius: 16px !important;
          overflow: hidden;
          flex: 1 0;
        }
        .maps {
          display: flex;
          gap: 16px;
          justify-content: space-between;
        }
        .pharmacy {
          display: flex;
          gap: 3.74rem;
        }
        .pharmacy > *:last-child {
          flex: 1;
        }
        .buttonlight {
          background: #edf2fb !important;
        }
      `}</style>
    </>
  )
}

Prescription.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Prescription
