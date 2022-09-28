import React from 'react'
import AboutBannner from 'components/AboutBanner'
import AboutContent from 'components/AboutContent'
import AboutOurApp from 'components/AboutOurApp'
import Knowledge from 'components/Knowledge'
import Layout from 'components/Layout'
import { Colors } from '../../constants/index'

function About() {
  return (
    <div>
      <Layout>
        <div
          style={{ background: `primary.main`, height: '100%', width: '100%' }}
        >
          <AboutBannner />
          <AboutContent />
          <AboutOurApp />
          <Knowledge />
        </div>
      </Layout>
    </div>
  )
}

export default About
