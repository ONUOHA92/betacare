import React from 'react'
// import DashboardLayout from 'containersDoctors/DashboardLayout'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const DoctorDashboard = dynamic(
  () => import('containersDoctors/DoctorDashboard'),
  {
    ssr: false,
  }
)
const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Doctors -- BetaCare</title>
      </Head>
      <DoctorDashboard />
    </>
  )
}
Dashboard.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
