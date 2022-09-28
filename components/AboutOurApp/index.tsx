import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { CHAT_INFO, } from 'constants/constants'
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from 'react-icons/fa'
import { Wrapper, titleContainerStyle, Buttons } from './style'
import Image from 'next/image';

function index(props) {

    return (
        <Wrapper>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Typography sx={titleContainerStyle}>Get our app today and get started</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                            <Buttons>
                                <FaGooglePlay /> Get on Playstore
                            </Buttons>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Buttons>
                                <FaAppStoreIos /> Get on Appstore
                            </Buttons>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Image src={CHAT_INFO} width="793px" height={'791'} alt={`Desciption for how to chat with doctor`} />
                </Grid>
            </Grid>
        </Wrapper>
    );
}

export default index;
