import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const PatientDashboard = dynamic(() => import('containers/PatientDashboard'), {
  ssr: false,
})

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Patients -- BetaCare</title>
      </Head>
      <PatientDashboard />
    </>
  )
}

Dashboard.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
