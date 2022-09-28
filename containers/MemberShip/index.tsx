import React from 'react'
import { Container, Grid } from '@mui/material'
import Image from 'next/image'
import styles from './style.module.css'
import Tech from 'public/images/about/tech.svg'
import Max from 'public/images/about/max.svg'

interface Props {
  alt?: string
  src?: any
}

function MemberShip({ alt, src }: Props) {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3>Partnerships & Memberships</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <div className={styles.techImage}>
                    <Image src={Tech} />
                  </div>

                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <div className={styles.tech}>
                    <p>
                      BetaCare is a member of the International Society for
                      Telemedicine & e-Health (ISfTeH) a non-profit society
                      organisation, facilitating the dissemination and exchange
                      of knowledge and experience in Telemedicine and e-Health
                      and also providing access to recognised experts in the
                      field worldwide
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <div className={styles.maxImages}>
                    <Image src={Max} />
                  </div>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <div className={styles.max}>
                    <p>
                      BetaCare is a member of the International Society for
                      Telemedicine & e-Health (ISfTeH) a non-profit society
                      organisation, facilitating the dissemination and exchange
                      of knowledge and experience in Telemedicine and e-Health
                      and also providing access to recognised experts in the
                      field worldwide
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  )
}

export default MemberShip
