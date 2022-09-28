import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Layout from 'components/Layout'
import Hero  from 'components/Hero'

import CircularProgress from '@mui/material/CircularProgress'
import ChooseUs from '../components/ChooseUs'
import ServiceOffer from 'components/ServicesWeOffer'
import GetStarted from 'components/GetStarted'
import Knowledge from 'components/Knowledge'

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {loading ? (
        <CircularProgress color="primary" sx={{m:"40vh 50vw"}} />
      ) : (
        <Layout>
          <Hero  />
          <ChooseUs />
          <ServiceOffer />
          <GetStarted />
          <Knowledge />
        </Layout>
      )}
    </>
  )
}

// #303030

export default Home
