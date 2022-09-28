import * as React from 'react'
import styles from './style.module.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

export default function SmallCard({
  icon,
  title,
  count,
}: {
  icon: string
  title: string
  count: number
}) {
  return (
    <Card sx={{ minWidth: 275 }} className={styles.addBoxShadow}>
      <CardContent>
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            <Image src={icon} alt="" />
          </div>
          <div className={styles.inner}>
            <div>{title}</div>
            <div>{count}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
