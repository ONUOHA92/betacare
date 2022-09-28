import React, { useState, useEffect } from 'react'
import DashboardLayout from 'containers/AdminDashboardLayout'
import Head from 'next/head'
import style from './style.module.css'
import {
  useGetPatientSignupLogs,
  useRegisteredDoctorCount,
  useRegisteredPatientCount,
  useRegisteredLaboratoryCount,
  useRegisteredPharmacyCount,
  useRegisteredSubAdminCount,
} from 'network/ReactQuery/Queries/Admin/adminDashboard'

// icons
import calender from 'public/images/icons/calender.svg'
import mprescriptions from 'public/images/icons/mprescriptions.svg'
import doctor from 'public/images/icons/doctor2.svg'
import SmallCard from 'containers/SmallCard'
import PlainTable from 'components/Table'
import PlainTablePagination from 'components/Pagination'
import { Pagination } from '@mui/material'
import {
  blueMagenta,
  burntOrange,
  cyanBlue,
  lightCyanBlue,
  lightMintGreen,
} from 'utils/config/colors'

const AdminDashboard = () => {
  const circleColorGenerator = (color: string) => {
    if (color === lightCyanBlue) {
      return cyanBlue
    } else if (color === burntOrange) {
      return burntOrange
    } else if (color === lightMintGreen) {
      return lightMintGreen
    } else {
      return blueMagenta
    }
  }
  const headers = ['Date', 'Email', 'Phone number', 'Time']
  const [page, setPage] = useState(0)
  const { patientSignupLogs, refetchPatientSignupLogs } =
    useGetPatientSignupLogs(page)
  const [rows, setRows] = useState(null)

  const { registeredDoctorCount } = useRegisteredDoctorCount()

  const { registeredPatientCount } = useRegisteredPatientCount()
  const { registeredLaboratoryCount } = useRegisteredLaboratoryCount()
  const { registeredPharmacyCount } = useRegisteredPharmacyCount()
  const { registeredSubAdminCount } = useRegisteredSubAdminCount()
  useEffect(() => {
    if (patientSignupLogs) {
      const rows = patientSignupLogs.content.map((log: any) => {
        return {
          date: log.date.split('T')[0],
          email: log.email,
          phoneNumber: log.phoneNumber,
          time: log.time,
        }
      })
      setRows(rows)
    }
  }, [patientSignupLogs])

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  useEffect(() => {
    refetchPatientSignupLogs()
  }, [page])

  return (
    <>
      <Head>
        <title>Admin -- Betacare</title>
      </Head>
      <div className={style.welcome}>Welcome, Admin!</div>
      <div className={style.smallCard}>
        <SmallCard
          icon={calender}
          title="Registered Patients"
          count={registeredPatientCount ? registeredPatientCount : 0}
        />
        <SmallCard
          icon={doctor}
          title="Registered Doctors"
          count={registeredDoctorCount ? registeredDoctorCount : 0}
        />
        <SmallCard
          icon={mprescriptions}
          title="Registered Laboratories"
          count={registeredLaboratoryCount ? registeredLaboratoryCount : 0}
        />
        <SmallCard
          icon={calender}
          title="Registered Pharmacies"
          count={registeredPharmacyCount ? registeredPharmacyCount : 0}
        />
        <SmallCard
          icon={doctor}
          title="Sub Admins"
          count={registeredSubAdminCount ? registeredSubAdminCount : 0}
        />
      </div>
      <div className={style.logContainer}>
        <div className={style.logTitle}>
          Patient sign up log
          <span className={style.logCount}>
            {' '}
            (
            {patientSignupLogs?.totalElements
              ? patientSignupLogs?.totalElements
              : 0}
            )
          </span>
        </div>
        {rows && (
          <>
            <PlainTable arrHeaders={headers} arrRows={rows} />

            <div className={style.pagination}>
              <div className={style.paginationLeft}>
                Show page {patientSignupLogs?.number + 1}
              </div>
              <div className={style.paginationRight}>
                <Pagination
                  count={patientSignupLogs?.totalPages + 1}
                  page={page}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AdminDashboard
