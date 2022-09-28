import React from 'react';
import { Grid, Container, Card } from '@mui/material'
import Image from 'next/image';
import person from 'public/images/home/social/person.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import styles from './style.module.css';
import { flexbox } from '@mui/system';



interface Props {
    id?: number,
    text?: string,
    name?: string,
    role?: string
}


function Testimonial({ id, text, name, role }: Props) {


    const dataInfo = [
        {
            id: 0,
            image: person,
            text: '“I really love BetaCare! It is affordable and I was able to talk to a doctor and treat my illness without any hassle!”',
            name: 'Bamidele Hassan ',
            role: 'Customer'

        },
        {
            id: 1,
            image: person,
            text: '“This is healthcare that is very  accessible to everyone. BetaCare is the way to go! ',
            name: 'Vivian  Cole',
            role: 'Customer'

        },
        {
            id: 2,
            image: person,
            text: '“I booked a virtual appointment with a doctor and I was treated at the comfort of my home. BetaCare app is easy to  download and I was able to easily access the healthcare I needed.”',
            name: 'Tunde Gbadamosi',
            role: 'Customer'

        },

    ]



    return (
        <React.Fragment>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.testContent}>
                        <h4 className={styles.title}>Testimonial</h4>
                        <Carousel
                        preventMovementUntilSwipeScrollTolerance={true}
                        swipeScrollTolerance={50}
                        >

                            <div className={styles.gridContainer}>
                                <Container>
                                    <Grid container spacing={2}>
                                        {dataInfo.map((data, index) => (
                                            <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                                                <Card>
                                                    <div className={styles.image}>
                                                        <Image src={data.image} alt={`photo`} />
                                                    </div>
                                                    <p className={styles.content}>
                                                        {data.text}
                                                    </p>
                                                    <h4 className={styles.contentName}>
                                                        {data.name}
                                                    </h4>

                                                    <div className={styles.contentRoleInfo}>
                                                        <p className={styles.contentRole}>{data.role}</p>
                                                    </div>
                                                </Card>
                                            </Grid>

                                        ))}
                                    </Grid>
                                </Container>
                            </div>
                            <div className={styles.gridContainer}>
                                <Container>
                                    <Grid container spacing={2}>
                                        {dataInfo.map((data, index) => (
                                            <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                                                <Card>
                                                    <div className={styles.image}>
                                                        <Image src={data.image} alt={`photo`} />
                                                    </div>
                                                    <p className={styles.content}>
                                                        {data.text}
                                                    </p>
                                                    <h4 className={styles.contentName}>
                                                        {data.name}
                                                    </h4>
                                                    <div className={styles.contentRoleInfo}>
                                                        <p className={styles.contentRole}>{data.role}</p>
                                                    </div>
                                                </Card>
                                            </Grid>

                                        ))}
                                    </Grid>
                                </Container>
                            </div>
                            

                        </Carousel>
                    </div>

                </div>

            </Container>
        </React.Fragment>


    );
}

export default Testimonial;