import Paper from 'componentsDoctors/Paper'
import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import { Button, Rating, Box } from '@mui/material'
// import Rating from 'containers/Rating'

interface Props {
  image?: string
  role: string
  name?: string
  ratings?: string
  link?: string
}

const DoctorCard = ({ image, role, ratings, name, link, ...props }: Props) => {
  return (
    <Paper className={styles.wrapper} {...props}>
      {image && (
        <div className={styles.topImg}>
          <img src={image} alt="" width="70px" height={'70px'} />
        </div>
      )}
      <div className={styles.details}>
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      {ratings && (
        <div className={styles.ratings}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              value={Number(ratings)}
              precision={0.1}
              readOnly
              size="small"
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Box sx={{ ml: 2 }}>{ratings}</Box>
          </Box>
        </div>
      )}
      {link && (
        <div className={styles.view}>
          <Link href={`doctors/${name}`} passHref scroll={false}>
            View profile
          </Link>
        </div>
      )}
    </Paper>
  )
}

export default DoctorCard
