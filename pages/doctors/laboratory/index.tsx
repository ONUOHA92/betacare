// @ts-nocheck
/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState, useContext } from 'react'

import PrescriptionCard from 'containersDoctors/PrescriptionCard'
import LabCardWithChildren from 'componentsDoctors/LabCardWithChildren'
import stylelo from './style.module.css'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// icons
import heart from 'public/images/icons/heart.svg'
import chain from 'public/images/icons/chain.svg'
import { cardDetails, prescriptionsMultiple } from 'utils/mocking_data'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)
const Laboratory = () => {
  return (
    <>
      <Head>
        <title>Laboratory -- BetaCare</title>
      </Head>
      <div className={stylelo.positionLabby}>
        <div className={stylelo.labby}>Laboratory</div>
        <div className={stylelo.labbyMini}>View your medical test result</div>
      </div>
      <div className={stylelo.flexify}>
        <LabCardWithChildren
          wd="100%"
          hg="735px"
          icon={heart}
          title="All my Tests"
          text={cardDetails[1].text}
          btn={true}
          smallBtn={true}
        >
          <div className={stylelo.makeContainer}>
            {prescriptionsMultiple.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                wd="450px"
                hg="151px"
                icon={chain}
                title="Prescription"
                name={prescription.name}
                date={prescription.date}
                item={prescription.item}
                time={prescription.timeSince}
                active={prescription.active}
                type="lab"
                status={prescription.status}
                prescriptionId={prescription.id}
              />
            ))}
          </div>
        </LabCardWithChildren>
      </div>
      <div className={stylelo.flexify}></div>
    </>
  )
}

Laboratory.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Laboratory
