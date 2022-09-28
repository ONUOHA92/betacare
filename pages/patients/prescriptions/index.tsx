import Button from 'components/Button'

import styles from 'styles/pages/prescription.module.css'
import { MenuItem, Pagination } from '@mui/material'
import { useRef, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import PlainTable from 'components/Table'
import PrescriptionDetail from 'components/PrescriptionDetail'
import PrescriptionList from 'components/PrescriptionList'
import GoogleApiWrapper from 'components/Maps'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import Paper from 'components/Paper'
import SelectPharmacyCard from 'containers/SelectPharmacyCard copy'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const PurchaseDrugCard = dynamic(() => import('containers/PurchaseDrugCard'), {
  ssr: false,
})

const Prescription = () => {
  const [state, setState] = useState('presciptionList')
  const printRef = useRef()

  const handleDownloadPdf = async (downloadFileName) => {
    const element = printRef.current
    const canvas = await html2canvas(element)
    const data = canvas.toDataURL('image/png')

    const pdf = new jsPDF()
    const imgProperties = pdf.getImageProperties(data)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${downloadFileName}.pdf`)
  }
  return (
    <>
      <Head>
        <title>Prescriptions | Betacare</title>
      </Head>
      <div className={styles.wrapper}>
        <header>
          <div className={styles.text}>
            <h2>Prescriptions</h2>
            <p>All your prescriptions at the tip of your finger</p>
          </div>
          {state === 'presciptionDetail' && (
            <div>
              <Button
                wd="244px"
                hg="45px"
                color="secondary"
                className={styles.downloadBtn}
                onClick={() => handleDownloadPdf('prescription')}
              >
                Download Prescription
              </Button>
            </div>
          )}
        </header>
        {state === 'presciptionList' && (
          <PrescriptionList setState={setState} />
        )}
        {state === 'presciptionDetail' && (
          <div>
            <PrescriptionDetail ref={printRef} setState={setState} />
          </div>
        )}
        {state === 'maps' && (
          <div className="maps">
            <div className="mapWrapper">
              <GoogleApiWrapper />
            </div>
            <SelectPharmacyCard setState={setState} />
          </div>
        )}
        {state === 'pharmacy' && (
          <div className="pharmacy">
            <SelectPharmacyCard setState={setState} />
            <Paper style={{ flex: 1 }}>
              <PurchaseDrugCard />
            </Paper>
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
