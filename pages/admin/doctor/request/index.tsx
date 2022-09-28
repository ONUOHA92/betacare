import AdminDashboardLayout from 'containers/AdminDashboardLayout'
import styles from './style.module.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import RequestList from 'components/RequestList'
import { useGetDoctorSignupLogs } from 'network/ReactQuery/Queries/Admin/doctorRequests'
import 'react-toastify/dist/ReactToastify.css'

const RequestDetail = dynamic(() => import('components/RequestDetail'), {
  ssr: false,
})
const DoctorRequest = () => {
  const [state, setState] = useState('requestList')
  const [openModal, setOpenModal] = useState(false)
  const [page, setPage] = useState(0)
  const { doctorSignupLogs } = useGetDoctorSignupLogs(page)
  const [rows, setRows] = useState(null)
  const [doctorDetails, setDoctorDetails] = useState(null)
  useEffect(() => {
    if (doctorSignupLogs) {
      const rows = doctorSignupLogs.content.map((log: any) => {
        return {
          date: log.date,
          email: log.email,
          phoneNumber: log.phoneNumber,
          time: log.time,
          prescription: 'show',
          id: log.id,
        }
      })
      setRows(rows)
    }
  }, [doctorSignupLogs])

  useEffect(() => {
    console.log('doctor details', doctorDetails)
  }, [doctorDetails])

  return (
    <>
      <Head>
        <title>Prescriptions | Betacare</title>
      </Head>
      <div>
        <header>
          <div className={styles.text}>
            <h2>
              Doctor&apos;s Signup Request{' '}
              <span className={styles.reducedOpacity}>
                ({doctorSignupLogs?.numberOfElements})
              </span>
            </h2>
          </div>
        </header>

        {rows && rows.length > 0 && (
          <RequestList
            setState={setState}
            setOpenModal={setOpenModal}
            doctorSignupLogs={rows}
            setDoctorDetails={setDoctorDetails}
          />
        )}

        {openModal && (
          <RequestDetail
            openModal={openModal}
            setOpenModal={setOpenModal}
            doctorDetails={doctorDetails}
          />
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

DoctorRequest.getLayout = function getLayout(page: any) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>
}

export default DoctorRequest
