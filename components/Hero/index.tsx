import React from 'react'
import { Button, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { HOME_BANNER } from 'constants/constants'
import {
  buttonStyle,
  heroHeading,
  heroHeadingWrapper,
  herosubHeading,
  imgStyle,
} from './style'
import { ROUTES } from 'navigation/routes'

const Hero = () => {
  return (
    <Grid container alignItems={'center'} component="section">
      <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
        <CardMedia
          component="img"
          image={HOME_BANNER}
          sx={imgStyle}
          alt={'Description for patients and doctors image'}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography component="section" sx={heroHeadingWrapper}>
          <Typography variant="h2" component="h1" sx={heroHeading}>
            <Typography
              component="span"
              sx={heroHeading}
              color={'secondary.contrastText'}
            >
              The
            </Typography>
            Trail-blazers
          </Typography>
          <Typography variant="h5" component="h2" sx={heroHeading}>
            <Typography
              component="span"
              sx={heroHeading}
              color={'secondary.contrastText'}
            >
              in
            </Typography>
            Virtual Healthcare.
          </Typography>

          <Typography sx={herosubHeading} component="h6" variant="h5">
            We are the premier virtual hospital that provides very affordable
            and optimal healthcare for everyone for less than a dollar!
          </Typography>
          <Typography
            sx={{ ...herosubHeading, ml: { xs: '10%', sm: '2%', md: '0%' } }}
            component="div"
            variant="h5"
          >
            <Link href={ROUTES.watchMore}>
              <Button type="submit" color="primary" 
              sx={buttonStyle}
              >
                Watch Demo <PlayCircleIcon />
              </Button>
            </Link>
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Hero
