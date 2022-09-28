// @ts-nocheck
import Button from 'componentsDoctors/Button'

import styles from 'styles/pages/prescription.module.css'
import { MenuItem, Pagination } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import GoogleApiWrapper from 'componentsDoctors/Maps'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import SelectPharmacyCard from 'containersDoctors/SelectPharmacyCard copy'
import { useRouter } from 'next/router'
import PharmacyDrugsGrid from 'containersDoctors/PharmacyDrugsGrid'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)
const PharmacyPage = () => {
  const [state, setState] = useState('maps')
  const printRef = useRef()
  const router = useRouter()

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
  useEffect(() => {
    if (router.query.searchResult === '') {
      setState('searchResult')
    }
  }, [router.query])
  return (
    <>
      <Head>
        <title>Pharmacy | Betacare</title>
      </Head>
      <div className={styles.wrapper}>
        <header>
          <div className={styles.text}>
            {state !== 'drugs' && (
              <>
                <h2>Pharmacy</h2>
                <p>Find a pharmacy</p>
              </>
            )}
            {state === 'drugs' && <h2>Mainland Hospital Yaba</h2>}
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
        {state === 'drugs' && <PharmacyDrugsGrid />}

        {state === 'maps' && (
          <div className="maps">
            <div className="mapWrapper">
              <GoogleApiWrapper />
            </div>
          </div>
        )}

        {state === 'searchResult' && (
          <div className="maps">
            <div className="mapWrapper">
              <GoogleApiWrapper />
            </div>
            <SelectPharmacyCard setState={setState} />
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

PharmacyPage.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default PharmacyPage
