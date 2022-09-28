import React from 'react'
import { Container, Grid } from '@mui/material'
import Image from 'next/image'
import styles from './style.module.css'
import betaLogo from 'public/images/about/BetaCare_logo.png'

function AboutWho(props) {
  return (
    <Container>
      <div className={styles.wrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className={styles.who}>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <div className={styles.vertical}></div>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                  <div className={styles.title}>
                    <h3>Who we are</h3>
                    <p>
                      NXT Medical is a subsidiary of NXT Technologies. At NXT
                      Medical we have partnered with leading companies in Africa
                      to provide technology-based solutions in the healthcare
                      industry. We recognise that technological innovations play
                      a crucial role in sustaining health and that’s why we came
                      up with BetaCare as a solution to help streamline
                      processes, improve workflow, provide access to quality
                      health care and much more. BetaCare on-demand service
                      provides a high level of convenience and versatility,
                      allowing users connect with a doctor whenever the need
                      arises, and also providing holistic care by integrating
                      with pharmacy and laboratories. With our team of doctors
                      and tech experts, we are dedicated to improving the health
                      and overall quality of life, one product at a time
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className={styles.betaLogo}>
              <Image src={betaLogo} alt={`logo`} />
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default AboutWho
