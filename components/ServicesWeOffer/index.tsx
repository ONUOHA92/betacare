import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {

  Card,

  headingStyle,
  carouselHeading,
} from './style'

import Carousel from 'react-multi-carousel'
import { OUR_SERVICES } from 'constants/contents/ourService'
import { responsive } from 'utils/config/carousel'
import LayoutWithHeading from 'components/Layout/layoutWithHeading'

function Index(props) {
  const theme = useTheme()

  return (
    <LayoutWithHeading
    heading='Our Services'
    subHeading=' At BetaCare we offer a wide range of services'
    >
  
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {OUR_SERVICES.map((item, index) => {
          return (
            <Card key={index}>
              <Typography component={"h1"}
              sx={carouselHeading} 
              color="secondary.contrastText"
              >
                {item.title}
              </Typography>
              <Typography
                color="info.light"
                pt={20}
                fontWeight={300}
                fontSize={"1.5rem"}
              >
                {item.content}
              </Typography>
            </Card>
          )
        })}
      </Carousel>
  
    </LayoutWithHeading>
  )
}

export default Index
