import React from 'react';
import { Grid, Container } from '@mui/material'
import styles from './style.module.css'
import DoctorsForm from 'containers/DoctorsForm/DoctorsContact';
import Button from 'components/Button';


function DoctorsContact(props) {
    return (
        <div className={styles.wrapper}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className={styles.contactContainer}>
                            <h3>Contact Us </h3>
                            <div className={styles.content}>
                                <DoctorsForm />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className={styles.earnContainer}>
                            <div className={styles.innerearnContainer}>
                                <div className={styles.title}>
                                    Ready to Start Earning Beta ?
                                </div>
                                <div className={styles.textContianer}>
                                    Our platform is tailored to help you earn more.
                                </div>

                                <div className={styles.buttons}>
                                    <Button
                                        disabled={false}
                                        type="submit"
                                        color="primary"
                                    >
                                        Register
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default DoctorsContact;