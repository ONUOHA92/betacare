import React from 'react'
import { Grid, Typography } from '@mui/material'
import wallet from 'public/images/home/wallet.svg'
import access from 'public/images/home/acess.svg'
import health from 'public/images/home/health.svg'


import {
  wrapper,
} from './style'
import { Box } from '@mui/system'
import Content from './content'

function index() {
  return (
    <>
      <Box sx={wrapper} component={'section'}>
        <Typography variant="h1" component={'h1'} color="secondary.main"
        sx={{textAlign:{xs:'center',md:"left"}}}
        >
          Why Choose Us
        </Typography>
        <Grid container spacing={2}>
            <Content
              icon={wallet}
              title={"Affordability"}
              description={"At BetaCare, with little as one dollar, you can receivehealthcare services from qualified medical practitioners."}
            />
            <Content
              icon={access}
              title={"Accessibility"}
              description={"At BetaCare, with little as one dollar, you can receivehealthcare services from qualified medical practitioners."}
            />
            <Content
              icon={health}
              title={"Quality"}
              description={"At BetaCare, with little as one dollar, you can receivehealthcare services from qualified medical practitioners."}
            />
        </Grid>
      </Box>
    </>
  )
}

export default index
