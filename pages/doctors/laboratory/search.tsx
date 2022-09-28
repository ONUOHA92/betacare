// @ts-nocheck
import React, { ReactElement, useEffect, useState, useContext } from 'react'
import DashboardLayout from 'containersDoctors/DashboardLayout'
import stylelo from './style.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import SelectLaboratoryCard from 'containersDoctors/SelectLaboratoryCard'
import GoogleApiWrapper from 'componentsDoctors/Maps'
import RequestLabCard from 'containersDoctors/RequestLabCard'
import RequestTestCard from 'containersDoctors/RequestTestCard'
import Button from '@mui/material/Button'
import Paper from 'componentsDoctors/Paper'

const LaboratoryRequestCard = dynamic(
  () => import('containersDoctors/LaboratoryRequestCard'),
  { ssr: false }
)

const LaboratoryRequestCardAmb = dynamic(
  () => import('containersDoctors/LaboratoryRequestCardAmb'),
  { ssr: false }
)
const Laboratory = () => {
  const data = [
    {
      id: 1,
      title: 'Request an Ambulance',
      content:
        'Click here to request an ambulance from the comfort of your home or call ',
      phone: '09130001004',
      singleBtn: false,
    },
    {
      id: 2,
      title: 'Book a Home Test ',
      content:
        'Click here to book a Home  Ultrasound scan, special organ scan and other laboratory tests or call',
      phone: '09130001004',
      singleBtn: true,
    },
  ]

  const [googleMapClick, setGoogleMapClick] = useState(false)
  const [makeRequest, setMakeRequest] = useState(false)
  const [ambulanceRequest, setAmbulanceRequest] = useState(false)
  const handleAmbulanceRequest = () => {
    setMakeRequest(true)
    setAmbulanceRequest(true)
  }
  return (
    <>
      <Head>
        <title>Search -- BetaCare</title>
      </Head>
      <div className={stylelo.positionLabby}>
        <div className={stylelo.labby}>Laboratory</div>
        {!makeRequest ? (
          <div className={stylelo.labbyMini}>
            Find a Laboratory in your area
          </div>
        ) : (
          <div className={stylelo.labbyMini}>
            {!ambulanceRequest
              ? 'Place a request for a home test'
              : 'Place a request for an ambulance'}
          </div>
        )}
      </div>
      {!makeRequest ? (
        <div className="mappy">
          <div className="maps">
            <div
              className={stylelo.mapWrapper}
              onClick={() => setGoogleMapClick(!googleMapClick)}
            >
              <GoogleApiWrapper />
            </div>
          </div>
          <div className={stylelo.rightCards}>
            {googleMapClick ? (
              <div className="pharmacy">
                <SelectLaboratoryCard />
              </div>
            ) : (
              data?.map((item) => (
                <RequestLabCard
                  key={item.id}
                  title={item.title}
                  content={item.content}
                  phone={item.phone}
                  singleBtn={item.singleBtn}
                  setMakeRequest={setMakeRequest}
                  setAmbulance={handleAmbulanceRequest}
                />
              ))
            )}
          </div>
        </div>
      ) : !ambulanceRequest ? (
        <div className="request">
          <RequestTestCard
            key={data[1].id}
            title={data[1].title}
            content={data[1].content}
            phone={data[1].phone}
          />
          <Paper style={{ width: 640 }}>
            <LaboratoryRequestCard />
          </Paper>
        </div>
      ) : (
        <div className="request">
          <RequestTestCard
            key={data[0].id}
            title={data[0].title}
            content={data[0].content}
            phone={data[0].phone}
          />
          <Paper style={{ width: 640 }}>
            <LaboratoryRequestCardAmb />
          </Paper>
        </div>
      )}
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

Laboratory.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Laboratory
