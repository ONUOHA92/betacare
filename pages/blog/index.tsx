import React from 'react';
import Image from 'next/image';
import { Container, Grid, Card } from '@mui/material'
import drug from 'public/images/blog/drug.svg'
import drugs from 'public/images/blog/drugs.svg'
import covid from 'public/images/blog/covid.svg'
import Link from 'next/link';
import Input from 'components/Input';
import styles from './style.module.css'
import Layout from 'components/Layout';


const data = [
    {
        id: 1,
        image: drug,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 2,
        image: drug,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 3,
        image: drugs,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 4,
        image: covid,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 5,
        image: covid,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 6,
        image: covid,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 7,
        image: drug,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 8,
        image: drugs,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 9,
        image: drug,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 10,
        image: drugs,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 11,
        image: covid,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },
    {
        id: 12,
        image: drug,
        title: 'Targeted drug found effective in thwarting pancreatic tumors',
        info: 'Virginia Commonwealth University'

    },

]


function index(props) {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <div className={styles.title}>
                                <h2>Health Blog</h2>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>

                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <div className={styles.search}>
                                <Input
                                    placeholder='Search'
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <div className={styles.container}>
                        <Grid container spacing={2}>
                            {data.map((d, i) => (
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <Link href={`/blog/` + d.id}>
                                        <div key={i} className={styles.containerCard}>
                                            <Image src={d.image} alt={`images`} layout={`responsive`} />
                                            <div className={styles.content}>
                                                <div className={styles.cardTitle}>
                                                    <h4>{d.title}</h4>
                                                </div>
                                                <p>{d.info}</p>
                                            </div>


                                        </div>
                                    </Link>

                                </Grid>
                            ))}
                        </Grid>

                    </div>
                </Container >
            </div >
        </Layout>

    );
}

export default index;