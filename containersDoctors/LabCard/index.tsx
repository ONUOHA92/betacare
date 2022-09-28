import * as React from 'react'
import styles from './style.module.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

interface Props {
  wd?: string
  hg?: string
  name?: string
  title?: string
  time?: string
  date?: string
  hospital?: string
}

const LabCard = ({
  wd,
  hg,
  name,
  title,
  date,
  hospital,
  time,
}: React.PropsWithChildren<Props>) => {
  return (
    <Card
      sx={{ width: wd, height: '100%' }}
      className={`${styles.addBoxShadow} ${styles.pushUp}`}
    >
      <CardContent className={styles.padleft}>
        <div className={styles.flexApp}>
          <div className={styles.firstApp}>
            <span>{date}</span> <span>{time}</span>
          </div>
          <div className={styles.secondApp}>{name}</div>
          <div className={styles.thirdApp}>{title}</div>
          <div className={styles.fourthApp}>{hospital}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LabCard
