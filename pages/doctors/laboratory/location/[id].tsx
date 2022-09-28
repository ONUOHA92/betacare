// @ts-nocheck
/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState, useContext } from 'react'
import stylelo from '../style.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Button from '@mui/material/Button'
import Paper from 'componentsDoctors/Paper'
import SelectLaboratoryCard from 'containersDoctors/SelectLaboratoryCard'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)
const LaboratoryRequestCardLocation = dynamic(
  () => import('containersDoctors/LaboratoryRequestCardLocation'),
  { ssr: false }
)

const Location = () => {
  return (
    <>
      <Head>
        <title>Location -- BetaCare</title>
      </Head>
      <div className={stylelo.positionLabby}>
        <div className={stylelo.labby}>Laboratory</div>
        <div className={stylelo.labbyMini}>Find a Laboratory in your area</div>
      </div>
      <div className="request">
        <SelectLaboratoryCard />
        <Paper style={{ width: 640 }}>
          <LaboratoryRequestCardLocation />
        </Paper>
      </div>
      <div className={stylelo.flexify}></div>
      <style jsx>{`
        .maps {
          display: flex;
          gap: 16px;
          justify-content: space-between;
        }
        .mappy {
          margin-top: 40px;
          display: flex;
          gap: 44px;
          flex-wrap: wrap;
        }
        .request {
          margin-top: 40px;
          display: flex;
          gap: 60px;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  )
}

Location.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Location
