import React, { useState } from 'react'
import styles from './style.module.css'
import { Container, Grid, Button } from '@mui/material'
import ReactPlayer from 'react-player'
import Image from 'next/image'
import One from 'public/images/home/social/one.png'
import Two from 'public/images/home/social/two.png'
import Three from 'public/images/home/social/three.png'

export default function Dropdown() {
  const [isShown, setIsShown] = useState(false)

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer}>
        <button onClick={handleClick} className={styles.buttons}>
          Learn more
        </button>
      </div>

      {isShown && (
        <Container>
          <div className={styles.content}>
            <h3>More Information</h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div className={styles.containerIconOne}>
                  <Grid container spacing={2}>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <div className={styles.icons}>
                        <Image src={One} alt={`icon`} />
                      </div>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                      <div className={styles.ContentText}>
                        <p>
                          Aired on Wazobia TV via DSTV, GoTV, MyTV and Startimes{' '}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className={styles.containerIconOne}>
                      <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                          <div className={styles.icons}>
                            <Image src={Two} alt={`icon`} />
                          </div>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                          <div className={styles.ContentText}>
                            <p>
                              Aired on Wazobia TV via DSTV, GoTV, MyTV and
                              Startimes{' '}
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className={styles.containerIconOne}>
                      <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                          <div className={styles.icons}>
                            <Image src={Three} alt={`icon`} />
                          </div>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={10}>
                          <div className={styles.ContentText}>
                            <p>
                              Aired on Wazobia TV via DSTV, GoTV, MyTV and
                              Startimes{' '}
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div className={styles.videoContent}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <div className={styles.paragraphContainer}>
                    <p>
                      Do not forget to subscribe to our youTube channel to stay
                      up to date with our show.{' '}
                    </p>

                    <p>Subscribe below to our youtube channel.</p>

                    <Button variant="contained">Subscribe</Button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <ReactPlayer
                    controls
                    width={`100%`}
                    url={`https://www.youtube.com/watch?v=ysz5S6PUM-U`}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      )}
    </div>
  )
}
