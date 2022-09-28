import { Box, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

interface ILayoutHeading {
  heading: string
  subHeading: string
  children: ReactNode
  colorHeading?: string
}

function LayoutWithHeading({
  children,
  heading,
  subHeading,
  colorHeading,
}: ILayoutHeading) {
  return (
    <Box>
      <Typography component="section" textAlign="center">
        <Typography
          textAlign="center"
          fontWeight={800}
          component={'h2'}
          variant={'h5'}
          sx={{ color: colorHeading || 'info.main' }}
        >
          {heading}
        </Typography>
        <Typography
          component="h3"
          variant="h1"
          fontWeight={100}
          textAlign={'center'}
          alignSelf={'center'}
          pt={'1%'}
          pb={'2%'}
        >
          {subHeading}
        </Typography>
      </Typography>
      {children}
    </Box>
  )
}

export default LayoutWithHeading
