import React from 'react';
import styles from './style.module.css'
import Image from 'next/image';
import information from 'public/images/home/social/information.png'
import square from 'public/images/home/social/square_2.png'

import { Container, Grid } from '@mui/material'
import Dropdown from 'components/Dropdown';

interface Props {

}

function LearnMore({ }: Props) {
    return (
        <Container>
            <div className={styles.wrapper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <div style={{ marginTop: '150%' }}>
                                    <Image src={square} alt={`icon`} />
                                </div>

                            </Grid>
                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                <div className={styles.showContainer}>
                                    <h4>Have you heard of our TV show?</h4>
                                    <h3>BetaLife with BetaCare</h3>
                                    <p>As a BetaCare doctor you also get to be
                                        a part of our informative
                                        TV show called Beta Life with BetaCare.</p>

                                    <p>Beta Life with BetaCare is a 30 mins interactive session with BetaCare Doctors.
                                        The show is designed to educate listeners and answer questions relating to health.</p>
                                </div>

                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                <Image src={information} alt={`information`} />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Image src={square} alt={`icon`} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div className={styles.dropdown}>
                    <Dropdown />
                </div>


            </div>

        </Container>

    );
}

export default LearnMore; 