/* eslint-disable @next/next/no-img-element */
import Paper from 'components/Paper'
import React from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import { Rating, Box } from '@mui/material'
import toInitials from 'utils/toInitials'
import { toFullName } from 'utils/toFullName'
import Button from 'components/Button'

interface Props {
  image?: string
  role: string
  firstName?: string
  lastName?: string
  ratings?: string
  link?: string
  doctorId?: number
}

const DoctorCard = ({
  image,
  role,
  ratings,
  firstName,
  lastName,
  link,
  doctorId,
  ...props
}: Props) => {
  return (
    <Paper className={styles.wrapper} {...props}>
      {image && (
        <>
          <div className={styles.topImg}>
            <img
              src={image}
              alt={toFullName({
                firstName: firstName,
                lastName: lastName,
              })}
              width="70px"
              height={'70px'}
            />
          </div>
        </>
      )}
      {!image && (
        <div className={styles.topImg}>
          <p>
            {toInitials(
              toFullName({
                firstName: firstName,
                lastName: lastName,
              })
            )}
          </p>
          <span className={styles.circlebadge}></span>
        </div>
      )}
      <div className={styles.details}>
        <h3>
          {toFullName({
            firstName: firstName,
            lastName: lastName,
          })}
        </h3>
        <p>{role}</p>
      </div>
      <div className={styles.available}>Available</div>
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
          <Link href={`appointment/doctor/${link}`} passHref scroll={false}>
            <Button
              type="submit"
              hg="40px"
              wd="60%"
              color="primary"
              className={styles.presBtn}
            >
              View details
            </Button>
          </Link>
        </div>
      )}
    </Paper>
  )
}

export default DoctorCard
