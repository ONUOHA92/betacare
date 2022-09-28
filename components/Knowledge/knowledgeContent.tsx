import React from 'react'
import { Grid, Typography, useTheme, Box } from '@mui/material'
import Image from 'next/image'
import { imageContinerStyle, paragraphStyle } from './style'



interface IKnowledgeContent {
  heading: string
  content: string
  image: string
  alt: string
}

function KnowledgeContent({ heading, content, image, alt }: IKnowledgeContent) {
  const theme = useTheme()
  return (
    <>
      <Grid container item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Box sx={imageContinerStyle}>
          <Image
            src={image || ""}
            width="1565"
            height={'1865'}
            alt={alt}
          />
          <div>
            <h3 >
              {heading}
            </h3>
            <Typography sx={paragraphStyle} variant='body1'>
              {content}
            </Typography>
          </div>
        </Box>
      </Grid>

    </>
  )
}

export default KnowledgeContent

