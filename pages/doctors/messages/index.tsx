/* eslint-disable @next/next/link-passhref */
import React from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)

const DoctorMessage = dynamic(() => import('containersDoctors/DoctorMessage'), {
  ssr: false,
})

const Messages = () => {
  return (
    <>
      <Head>
        <title>Messages -- BetaCare</title>
      </Head>
      <DoctorMessage />
    </>
  )
}

Messages.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Messages
