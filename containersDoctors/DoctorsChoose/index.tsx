import React from 'react';
import styles from './style.module.css'
import { Grid, Container } from '@mui/material'
import Image from 'next/image';
import wallet from 'public/images/doctors/wallet.png'
import Button from 'components/Button';
import earn from 'public/images/doctors/earn.png'
import clock from 'public/images/doctors/clock.png'
import flexible from 'public/images/doctors/flexible.png'
import secure from 'public/images/doctors/secure.png'

function DoctorsChoose(props) {
    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.titleContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className={styles.title}>
                                Why choose Us
                            </div>
                            <div className={styles.text}>
                                There are so many benefit you would when
                                you choose us today anywhere
                            </div>
                            <div className={styles.buttonContainer}>
                                <Button
                                    disabled={false}
                                    type="submit"
                                    color="primary"
                                >
                                    GET STARTED
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className={styles.cardContainer}>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <div className={styles.earnMore}>
                                            <div className={styles.walletContainer}>
                                                <Image src={wallet} alt={`wallet for earning`} />
                                                <div className={styles.cardEarntext}>
                                                    <div className={styles.earntitle}>
                                                        Earn more
                                                    </div>
                                                    <div className={styles.earnParagrah}>
                                                        Get paid for every consultation performed
                                                        on BetaCare. BetaCare guarantees you
                                                        a constant pool of
                                                        patients looking for health
                                                        care services that you offer.
                                                    </div>
                                                </div>
                                                <div className={styles.earnIcon}>
                                                    <Image src={earn} alt={`earn`} />
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <div className={styles.convenience}>
                                            <div className={styles.convenienceContainer}>
                                                <Image src={clock} alt={`time`} />
                                                <div className={styles.convenCardText}>
                                                    <div className={styles.conventitle}>
                                                        Convenience
                                                    </div>
                                                    <div className={styles.convenParagrah}>
                                                        Take consultations remotely on BetaCare
                                                        via chat, audio and video calls.
                                                        With BetaCare,
                                                        Doctors can work whenever
                                                        and wherever they like.
                                                    </div>
                                                    <div className={styles.earnIcon}>
                                                        <Image src={earn} alt={`earn`} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </Grid>
                                </Grid>
                                <div className={styles.secondline}>
                                    <Grid container spacing={6}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className={styles.flexible}>
                                                <div className={styles.flexibleContianer}>
                                                    <Image src={flexible} alt={`flexible`} />
                                                    <div className={styles.flexibleCardText}>
                                                        <div className={styles.flexibletitle}>
                                                            Flexible
                                                        </div>
                                                        <div className={styles.flexibleParagrah}>
                                                            BetaCare allows you to set your available days
                                                            and time and also manage your schedule.
                                                        </div>

                                                        <div className={styles.earnIcon}>
                                                            <Image src={earn} alt={`earn`} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className={styles.secure}>
                                                <div className={styles.secureContianer}>
                                                    <Image src={secure} alt={`flexible`} />
                                                    <div className={styles.flexibleCardText}>
                                                        <div className={styles.securetitle}>
                                                            Secure and Safe
                                                        </div>
                                                        <div className={styles.secureParagrah}>
                                                            BetaCare ensures that all your
                                                            information is protected at every step.
                                                        </div>

                                                        <div className={styles.earnIcon}>
                                                            <Image src={earn} alt={`earn`} />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>

                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>

        </div>
    );
}

export default DoctorsChoose;