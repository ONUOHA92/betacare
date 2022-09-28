import React from 'react'
import { Button, Grid } from '@mui/material'
import {
  MainContainer,
  Paragraph,
  ImageCover,
  ImageCoverSecond,
  buttonStyle,
} from './style'
import Image from 'next/image'
import curve from 'public/images/home/curve.svg'
import curve1 from 'public/images/home/curvegray.svg'
import Link from 'next/link'
import { Box } from '@mui/system'
import { ROUTES } from 'navigation/routes'

function Index() {
  return (
    <Box>
      <MainContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paragraph>
              With as little as 100 Naira you can receive health tips every day
              by talking to a doctor for free.
            </Paragraph>
            <Link href={ROUTES.signUp}>
              <Button sx={buttonStyle}>Get Started for Free</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ImageCover>
              <Image src={curve1} alt={`This is icon `} />
            </ImageCover>

            <ImageCoverSecond>
              <Image src={curve} alt={`This is icon`} />
            </ImageCoverSecond>
          </Grid>
        </Grid>
      </MainContainer>
    </Box>
  )
}
export default Index
