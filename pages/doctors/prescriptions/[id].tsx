import Button from 'componentsDoctors/Button'

import styles from 'styles/pages/prescription.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import PrescriptionDetail from 'componentsDoctors/PrescriptionDetail'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)
const Prescription = () => {
  return (
    <>
      <Head>
        <title>Prescriptions | Betacare</title>
      </Head>
      <div className={styles.wrapper}>
        <header>
          <div className={styles.text}>
            <h2>Prescriptions</h2>
            <p>Patient&apos;s prescriptions</p>
          </div>

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
        </header>

        <div>
          <PrescriptionDetail />
        </div>
      </div>
    </>
  )
}

Prescription.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Prescription
