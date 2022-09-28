// @ts-nocheck
/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState, useContext } from 'react'
import DashboardLayout from 'containersDoctors/DashboardLayout'
import stylelo from 'pages/doctors/laboratory/result/style.module.css'
import styles from 'styles/sidebar.module.css'
import Head from 'next/head'
import Button from 'componentsDoctors/Button'
import Link from 'next/link'
import { StyleOutlined } from '@mui/icons-material'
import BlankCardLarge from 'componentsDoctors/BlankCardLarge'

const Laboratory = () => {
  return (
    <>
      <Head>
        <title>Doctors -- BetaCare</title>
      </Head>
      <div className={stylelo.addFlex}>
        <div className={stylelo.positionLabby}>
          <div className={stylelo.labby}>Laboratory</div>
          <div className={stylelo.labbyMini}>View your medical test result</div>
        </div>
        <div>
          <Button
            wd="224px"
            hg="45px"
            color="primary"
            className={`${stylelo.dbtn}`}
          >
            <span>Download lab result</span>
          </Button>
        </div>
      </div>

      <div className={stylelo.card}>
        <BlankCardLarge bdr="16px" hg="726px">
          <div className={stylelo.container}>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6.00125H3.14L6.77 1.64125C6.93974 1.43704 7.0214 1.17375 6.99702 0.909329C6.97264 0.644902 6.84422 0.400991 6.64 0.231252C6.43578 0.0615137 6.1725 -0.0201482 5.90808 0.0042315C5.64365 0.0286112 5.39974 0.157036 5.23 0.361252L0.23 6.36125C0.196361 6.40898 0.166279 6.45911 0.14 6.51125C0.14 6.56125 0.14 6.59125 0.0700002 6.64125C0.0246737 6.75591 0.000941121 6.87796 0 7.00125C0.000941121 7.12454 0.0246737 7.24659 0.0700002 7.36125C0.0700002 7.41125 0.0699999 7.44125 0.14 7.49125C0.166279 7.54339 0.196361 7.59353 0.23 7.64125L5.23 13.6413C5.32402 13.7541 5.44176 13.8449 5.57485 13.9071C5.70793 13.9694 5.85309 14.0015 6 14.0013C6.23365 14.0017 6.46009 13.9203 6.64 13.7713C6.74126 13.6873 6.82496 13.5842 6.88631 13.4679C6.94766 13.3515 6.98546 13.2242 6.99754 13.0932C7.00961 12.9622 6.99573 12.8302 6.95669 12.7046C6.91764 12.579 6.8542 12.4623 6.77 12.3613L3.14 8.00125H15C15.2652 8.00125 15.5196 7.8959 15.7071 7.70836C15.8946 7.52082 16 7.26647 16 7.00125C16 6.73604 15.8946 6.48168 15.7071 6.29415C15.5196 6.10661 15.2652 6.00125 15 6.00125Z"
                fill="black"
              />
            </svg>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.99971 8.05976L12.4687 13.5303L13.5307 12.4698L8.06021 6.99926L13.5307 1.53026L12.4702 0.468262L6.99971 5.93876L1.53071 0.468262L0.470215 1.53026L5.93921 6.99926L0.470215 12.4683L1.53071 13.5303L6.99971 8.05976Z"
                fill="black"
              />
            </svg>
          </div>
        </BlankCardLarge>
      </div>

      <div className={stylelo.flexify}></div>
    </>
  )
}

Laboratory.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Laboratory
