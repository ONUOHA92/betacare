import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const DashboardLayout = dynamic(() => import('containers/DashboardLayout'), {
  ssr: false,
})

const PatientMessages = dynamic(() => import('containers/PatientMessage'), {
  ssr: false,
})

const Messages = () => {
  return (
    <>
      <Head>
        <title>Messages -- BetaCare</title>
      </Head>
      <PatientMessages />
    </>
  )
}

Messages.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Messages
