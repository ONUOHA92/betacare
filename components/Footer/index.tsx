import React from 'react'
import { Grid, IconButton, Typography } from '@mui/material'

import Link from 'next/link'
import logoImage from 'public/images/home/logoBeta.png'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

import { routes_about, routes_blog } from 'utils/routes'
import {
  Wrapper,
  Main,
  LogoContainer,
  SocialMediaIcon,
  SocialContainer,
  BorderLine,
  logofooterStyle,
  linkStyle,
  headingInfoStyle,
  copyRight,
  HeaderFooterStyle,
  iconStyle,
} from './style'
import Image from 'next/image'
import { ROUTES } from 'navigation/routes'
import { useRouter } from 'next/router'

function Index(props) {
  const navigate = useRouter()
  return (
    <Wrapper>
      <Main>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={6}>
            <LogoContainer>
              <IconButton
                size="small"
                edge="start"
                color="secondary"
                aria-label="menu"
                sx={logofooterStyle}
                onClick={() => navigate.push(ROUTES.home)}
              >
                <Image src={logoImage} alt={`BetaCare logo for footer`} />
              </IconButton>

              <Typography sx={headingInfoStyle}>
                We are the premier virtual hospital that provides very
                affordable and optimal healthcare for everyone.
              </Typography>

              <SocialMediaIcon>
                <Grid container spacing={2}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <InstagramIcon sx={iconStyle} />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <FacebookOutlinedIcon sx={iconStyle} />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TwitterIcon sx={iconStyle} />
                  </Grid>
                </Grid>
              </SocialMediaIcon>
            </LogoContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
            <SocialContainer>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  sx={{ marginBottom: '1rem' }}
                >
                  <Typography sx={HeaderFooterStyle}>Company</Typography>
                  <Typography sx={linkStyle}>
                    <Link href={routes_about.ABOUT_US}>About us</Link>
                  </Typography>
                  <Typography sx={linkStyle}>Career</Typography>
                  <Typography sx={linkStyle}>Pricing</Typography>
                  <Typography sx={linkStyle}>
                    <Link href={routes_blog.BlOG}>Blog</Link>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  sx={{ marginBottom: '1rem' }}
                >
                  <Typography sx={HeaderFooterStyle}>Medical</Typography>
                  <Typography sx={linkStyle}>Doctor</Typography>
                  <Typography sx={linkStyle}>Patient</Typography>
                  <Typography sx={linkStyle}>Healthcare service</Typography>
                  <Typography sx={linkStyle}>Betacare</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  sx={{ marginBottom: '1rem' }}
                >
                  <Typography sx={HeaderFooterStyle}>Support</Typography>
                  <Typography sx={linkStyle}>+2348753697789</Typography>
                  <Typography sx={linkStyle}>info@betacare.care</Typography>
                  <Typography sx={linkStyle}>info@nxt.ng</Typography>
                </Grid>
              </Grid>
            </SocialContainer>
          </Grid>
        </Grid>
        <BorderLine />
        <Typography sx={copyRight}>
          © 2022 Betacare, Inc. All rights reserved
        </Typography>
      </Main>
    </Wrapper>
  )
}

export default Index
