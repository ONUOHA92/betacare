import { Container } from '@mui/system'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import React from 'react'
import { layoutContainerStyle } from './style'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container
        sx={layoutContainerStyle}
        maxWidth={false}
        component="main"
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
