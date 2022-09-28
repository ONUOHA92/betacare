import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import Client from 'public/images/home/client.png'
import Link from 'next/link'

import { Container, Grid, Typography, Divider } from '@mui/material'
import { ROUTES } from 'navigation/routes'

function Partners(props) {
  return (
    <Container>
      <div className={styles.wrapper}>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={5} lg={6}>

            <div className={styles.partinerOne}>
              <Typography style={{ color: '#333333' }}>
                Partnerships & Memberships
              </Typography>
              <div className={styles.partImage}>
                <Divider style={{ color: '#8989A2', width: '250px' }}>
                  Trusted by
                </Divider>
                <Image src={Client} alt="partners " />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={7} lg={6}>

            <div className={styles.container}>
              <div className={styles.partinerTwo}>
                <h4 className={styles.partnerHeader}>
                  Ready for a Beta Virtual Visit?
                </h4>
                <Typography>
                  Our specialists are tailored to meet your every need both
                  young or old
                </Typography>
                <Link href={ROUTES.signUp}>
                  <button className={styles.partnerButton}>REGISTER</button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Partners
