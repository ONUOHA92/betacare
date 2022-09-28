import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const DashboardLayout = dynamic(
  () => import('containers/AdminDashboardLayout'),
  { ssr: false }
)

const AdminDashboard = dynamic(() => import('containersAdmin/AdminDashboard'), {
  ssr: false,
})

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Admin -- Betacare</title>
      </Head>
      <AdminDashboard />
    </>
  )
}

Dashboard.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default Dashboard
