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
  icon?: string
  name?: string
  title?: string
  time?: string
  date?: string
  item?: string
  active?: boolean
  color?: string
}

const AppointmentCard = ({
  wd,
  hg,
  name,
  title,
  date,
  icon,
  item,
  time,
  active,
  color,
}: React.PropsWithChildren<Props>) => {
  const dynamicBackground = (color: string) => {
    if (color === '#359EFF') {
      return styles.background1
    } else if (color === '#FE7F2D') {
      return styles.background2
    } else if (color === '#0ED63A') {
      return styles.background3
    } else {
      return styles.background4
    }
  }

  return (
    <Card
      sx={{ width: wd, height: hg }}
      className={`${styles.addBoxShadow} ${styles.one} ${dynamicBackground(
        color
      )}`}
    >
      <CardContent>
        <div className={styles.flexApp}>
          <div className={styles.firstApp}>
            <span>{date}</span> <span>{time}</span>
          </div>
          <div className={styles.secondApp}>{item}</div>
          <div className={styles.thirdApp}>{title}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AppointmentCard
