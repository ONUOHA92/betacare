import React from 'react'
import ReactPlayer from 'react-player'
import { Wrapper, headingStyle, playerContentStyle } from './style'
import { Typography, useTheme, Box } from '@mui/material'
import { ROUTES } from 'navigation/routes'

function AboutBannner(props) {
  const theme = useTheme();
  return (
    <>
      <Wrapper>
        <Typography variant='h1' component='h2' sx={headingStyle}>
          BetaCare is a virtual hospital that specializes in gathering medical
          doctors, specialists and linking them with patients and the general
          public that requires healthcare.
        </Typography>

        <Box sx={playerContentStyle}>
          <ReactPlayer controls width={`100%`}
            url={ROUTES.aboutUsVideo} />
        </Box>  
      </Wrapper>
    </>
  )
}

export default AboutBannner
