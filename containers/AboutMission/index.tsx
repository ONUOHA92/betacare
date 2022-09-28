import React from 'react'
import { Container, Grid } from '@mui/material'
import styles from './style.module.css'

function AboutMission(props) {
  return (
    <Container>
      <div className={styles.wrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className={styles.mission}>
              <h3>Our Mission</h3>
              <p>
                To improve quality of life through technology and world class
                delivery.
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className={styles.vission}>
              <h3>Our Vision</h3>
              <p>
                To empower our clients, aid digital transformation and ensure
                customer retention through innovative technological strategies
                and a collaborative approach.
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default AboutMission
