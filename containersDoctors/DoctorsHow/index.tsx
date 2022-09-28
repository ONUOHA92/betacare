import React from 'react';
import styles from './style.module.css'
import { Grid, Container } from '@mui/material'
import Image from 'next/image';
import Retangle from 'public/images/rectangle-one.png'
import RetangleTwo from 'public/images/rectangle-two.png'
import RetangleThree from 'public/images/rectangle-three.png'
import lineOne from 'public/images/lineOne.png'
import lineTwo from 'public/images/lineTwo.png'
import RetangleFour from 'public/images/rectangle-four.png'
import { Rectangle } from '@mui/icons-material';

function DoctorsHow(props) {
    return (
        <div className={styles.wrapper}>
            <h2>How it works</h2>
            { }
            <div className={styles.container}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <div className={styles.rectangleImageOne}>
                            <Grid container>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={styles.doctorStyle}>
                                        <Image src={Retangle} alt={`doctor one`} />
                                    </div>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5} lg={5}>
                                    <div className={styles.lineOneStyles}>
                                        <Image src={lineOne} alt={`line one`} />
                                    </div>
                                </Grid>
                            </Grid>
                            <h4>Register</h4>
                            <p>Register as a Doctor.</p>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <div className={styles.rectangleImageTwo}>
                            <Grid container>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={styles.doctorStyle}>
                                        <Image src={RetangleThree} alt={`doctor one`} />
                                    </div>
                                </Grid>
                                <Grid item xs={5} sm={5} md={5} lg={5}>
                                    <div className={styles.lineOneStyles}>
                                        <Image src={lineTwo} alt={`line one`} />
                                    </div>

                                </Grid>
                            </Grid>
                            <h4>Get Verification</h4>
                            <p>We verify and activate you. </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={43} lg={3}>
                        <div className={styles.rectangleImageThree}>
                            <Grid container>
                                <Grid item xs={7} sm={7} md={7} lg={7}>
                                    <div className={styles.doctorStyle}>
                                        <Image src={RetangleTwo} alt={`doctors`} />
                                    </div>

                                </Grid>
                                <Grid item xs={5} sm={5} md={7} lg={5}>
                                    <div className={styles.lineOneStyles}>
                                        <Image src={lineOne} alt={`line one`} />
                                    </div>
                                </Grid>
                            </Grid>
                            <h4>Set profile</h4>
                            <p>Set your expertise, schedule & charges .</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <div className={styles.rectangleImageFour}>
                            <Image src={RetangleFour} alt={`doctor one`} />
                            <h4>Earn</h4>
                            <p>Start earning extra as you accept online
                                patients.
                            </p>
                        </div>
                    </Grid>

                </Grid>


            </div>
        </div>
    );
}

export default DoctorsHow;