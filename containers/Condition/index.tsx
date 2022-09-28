import React from 'react';
import styles from './style.module.css'
import Nausea from 'public/images/Nasa.svg'
import Rash from 'public/images/rash1.png'
import Infected from 'public/images/infected.png'
import Button from 'components/Button';
import Image from 'next/image';
import { Container, Grid, Card, } from '@mui/material'
function Condition(props) {
    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <div className={styles.text}>
                                <h3>Conditions we treat</h3>
                            </div>
                        </Grid>
                    </Grid>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                                <div className={styles.cardBorderOne}>
                                    <div className={styles.containerImage}>
                                        <div className={styles.img}>
                                            <Image src={Nausea} alt={`name`} className={styles.img} />
                                        </div>
                                        <div className={styles.NauseaImg}>
                                            Nausea
                                        </div>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                                <div className={styles.cardBorderTwo}>
                                    <div className={styles.containerImage}>
                                        <div className={styles.img}>
                                            <Image src={Rash} alt={`name`} className={styles.img} />
                                        </div>
                                        <div className={styles.AllergeIamge}>
                                            Allergies
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                                <div className={styles.cardBorderThree}>
                                    <div className={styles.containerImage}>
                                        <div className={styles.img}>
                                            <Image src={Infected} alt={`name`} className={styles.img} />
                                        </div>
                                        <div className={styles.infected}>
                                            Skin
                                            Infections
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={3}>
                                <div className={styles.cardBorderFour}>
                                    <div className={styles.containerImage}>
                                        <div className={styles.img}>
                                            <Image src={Rash} alt={`name`} className={styles.img} />
                                        </div>
                                        <div className={styles.AllergeIamge}>
                                            Allergies
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        <div style={{ marginTop: 20 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4} lg={3}>
                                    <div className={styles.cardBorderFive}>
                                        <div className={styles.containerImage}>
                                            <div className={styles.img}>
                                                <Image src={Nausea} alt={`name`} className={styles.img} />
                                            </div>
                                            <div className={styles.NauseaImg}>
                                                Nausea
                                            </div>

                                        </div>

                                    </div>

                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3}>
                                    <div className={styles.cardBorderSix}>
                                        <div className={styles.containerImage}>
                                            <div className={styles.img}>
                                                <Image src={Rash} alt={`name`} className={styles.img} />
                                            </div>
                                            <div className={styles.AllergeIamge}>
                                                Allergies
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3}>
                                    <div className={styles.cardBorderSeven}>
                                        <div className={styles.containerImage}>
                                            <div className={styles.img}>
                                                <Image src={Nausea} alt={`name`} className={styles.img} />
                                            </div>
                                            <div className={styles.NauseaImg}>
                                                Nausea
                                            </div>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item xs={12} sm={12} md={4} lg={3}>
                                    <div className={styles.cardBorderEight}>
                                        <div className={styles.containerImage}>
                                            <div className={styles.img}>
                                                <Image src={Rash} alt={`name`} className={styles.img} />
                                            </div>
                                            <div className={styles.AllergeIamge}>
                                                Allergies
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    </Container>
                </div>

                <div className={styles.button}>
                    <Button
                        disabled={false}
                        type="submit"
                        color="primary"
                    >
                        SEE MORE
                    </Button>
                </div>

            </div>

        </Container>

    );
}

export default Condition;