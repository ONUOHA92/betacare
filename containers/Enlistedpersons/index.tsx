import React from 'react'
import styles from './style.module.css'
import { Container, Grid } from '@mui/material'

function EnlistedPersons(props) {
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className={styles.doctors}>
                <span className={styles.span}>150</span>
                <h5>Doctors</h5>
                <p>
                  Of “high-performing” level are led by a certified project
                  manager
                </p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className={styles.patients}>
                <span className={styles.span}>2,500</span>
                <h5>Patients</h5>
                <p>That meets quality standards required by our users</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div className={styles.support}>
                <span className={styles.span}>24/7</span>
                <h5>Support</h5>
                <p>Actively engage team members that finishes on time</p>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default EnlistedPersons
