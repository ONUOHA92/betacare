import React from 'react';
import { Box, Paper, Grid, Container } from '@mui/material';
import Image from 'next/image';
import styles from './style.module.css'
import doctor from 'public/images/home/doctor.png'
import ladydoctor from 'public/images/home/doc.png'
import Line from 'public/images/home/social/line.png'
import Square2 from 'public/images/home/social/square_2.png'
import Medical from 'public/images/home/social/medical.png'
import Square3 from 'public/images/home/social/square_3.png'
import Square from 'public/images/home/social/square.png'
import BigNurse from 'public/images/home/big-nurse.svg'
import { DoctorsBannertitle, DoctorsParagraph } from 'utils/landing';



const DoctorsBanner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.bannerContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <div className={styles.doctorContainer}>
                            <Image src={doctor} alt={`this is the doctors image`} />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <div className={styles.titleContainer}>
                            <div className={styles.DoctorBanner}>
                                You can now practice and earn at the comfort of your Home.
                            </div>
                            <div className={styles.DoctorParagraph}>
                                Get paid for every consultation you have on BetaCare...
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <div className={styles.nurseContainer}>
                            <Image src={ladydoctor} alt={`this is the doctors image`} />
                        </div>
                    </Grid>
                </Grid>



                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Image src={Line} alt={`line  it`} />
                    </Grid>
                </Grid>

                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <div className={styles.squareOneContainer}>
                                        <Image src={Square2} alt={`icons`} />
                                    </div>

                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <Image src={Medical} alt={`doctor image`} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <div className={styles.squareThirdContainer}>
                                <Image src={Square3} alt={`icons image`} />
                            </div>

                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <Image src={BigNurse} alt={`nurses`} />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <div className={styles.secondContentImage}>
                                        <Image src={Square} alt={`icons `} />
                                    </div>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default DoctorsBanner;