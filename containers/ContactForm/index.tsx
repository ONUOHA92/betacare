import React from 'react';
import { Grid, Container, Card, TextareaAutosize } from '@mui/material'
import Image from 'next/image';
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import person from 'public/images/contact/contact.png'
import styles from './style.module.css'
import Button from 'components/Button'
import Input from 'components/Input'





function ContactForm(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Image src={person} alt={`logo`} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Card>
                                <div className={styles.cards}>
                                    <h2>Please fill the form to contact us</h2>
                                </div>
                                <form>
                                    <div className={styles.cardContainer}>
                                        <div style={{ marginTop: 5 }}>
                                            <Input
                                                label='Full Name'
                                                type="text"
                                                styleName={styles.input}
                                                placeholder="Teejay Teko"
                                                name="email"

                                            />
                                        </div>

                                        <div style={{ marginTop: 20 }}>
                                            <Input
                                                label='Email'
                                                type="text"
                                                styleName={styles.input}
                                                placeholder="Enter email adress"
                                                name="password"
                                            // icon={}

                                            />
                                        </div>

                                        <div style={{ marginTop: 20 }}>
                                            <Input
                                                label='Phone number'
                                                type="number"
                                                styleName={styles.input}
                                                placeholder="+234 8123456789"
                                                name="password"
                                            />

                                        </div>
                                        <div style={{ marginTop: 10, paddingTop: 5 }}>
                                            <label htmlFor="">Massage</label>
                                            <div>
                                                <TextareaAutosize
                                                    aria-label="minimum height"
                                                    className={styles.textArea}
                                                    minRows={4}
                                                    cols={10}
                                                    placeholder="Enter message..."
                                                />
                                            </div>
                                        </div>


                                        <div style={{ marginTop: 15 }}>
                                            <Button
                                                // isLoading={isLoggingIn}
                                                disabled={false}
                                                type="submit"
                                                color="primary"
                                            >
                                                Submit
                                            </Button>

                                        </div>


                                    </div>





                                </form>

                            </Card>
                        </Grid>
                    </Grid>
                </Container>


            </div>
        </div>
    );
}

export default ContactForm;