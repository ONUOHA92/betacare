import React from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { FRUIT_IMAGE, RUNNER_FITNESS, DRUG_IMAGE } from 'constants/constants'
import LayoutWithHeading from 'components/Layout/layoutWithHeading'
import KnowledgeContent from './knowledgeContent'


function Index() {
  const theme = useTheme()
  return (
    <>
      <LayoutWithHeading
        heading="Knowledge hub"
        subHeading="Get health tips for free!"
        colorHeading="info.dark"
      >
        <Grid container spacing={5}>
          <KnowledgeContent
            image={FRUIT_IMAGE}
            alt="healthy fruit image"
            heading=" July 17, 2022"
            content="Live a balance life on the run way."
          />
          <KnowledgeContent
            image={RUNNER_FITNESS}
            alt="Description of someone runing"
            heading=" July 17, 2022"
            content="Live a balance life on the run way."
          />

          <KnowledgeContent
            image={DRUG_IMAGE}
            alt="Drugs Image"
            heading=" July 17, 2022"
            content="Live a balance life on the run way."
          />
        </Grid>
      </LayoutWithHeading>
    </>
  )
}

export default Index
