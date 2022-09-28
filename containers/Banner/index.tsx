import React from 'react'
import { Paper, Grid, Container } from '@mui/material'
import Image from 'next/image'
import patientDoctors from 'public/images/banner/desc.png'
import styles from './style.module.css'
import Button from 'components/Button'
import Link from 'next/link'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { Colors } from '../../constants/index'
import { routes_social } from 'utils/routes'
import { HOME_BANNER } from '../../constants/constants'

const Banner = () => {
  const ButtonStyle = {
    marginTop: '50px',
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContainer}>
        <Container>
          <div className={styles.bannerContent}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className={styles.leftContainer}>
                  <Image
                    src={HOME_BANNER}
                    width={`557`}
                    height={`558`}
                    alt={'Description for patients and doctors image'}
                    className={styles.bannerImage}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className={styles.rightBannerContainer}>
                  <div className={styles.TrailBlazers}>
                    <span
                      style={{
                        color: `info.dark`,
                      }}
                    >
                      The
                    </span>
                    Trail-blazers
                  </div>
                  <div className={styles.healthCare}>
                    <span
                      style={{
                        color: `info.dark`,
                      }}
                    >
                      in
                    </span>{' '}
                    Virtual Healthcare.
                  </div>

                  <div
                    className={styles.healthcareParagraph}
                    style={{ color: Colors.secondarylightGray }}
                  >
                    We are the premier virtual hospital that provides very
                    affordable and optimal healthcare for everyone for less than
                    a dollar!
                  </div>

                  <div className={styles.ButtonStyle}>
                    <Link href={routes_social.WATCH_MORE}>
                      <Button
                        disabled={false}
                        type="submit"
                        color="primary"
                        wd="277px"
                      >
                        Watch Demo <PlayCircleIcon />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Banner
