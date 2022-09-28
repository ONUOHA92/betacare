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
  color?: number
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
  const dynamicBackground = (color: number) => {
    if (color === 0) {
      return styles.background1
    } else if (color === 1) {
      return styles.background2
    } else if (color === 2) {
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
          <div className={styles.secondApp}>Status: {item}</div>
          <div className={styles.thirdApp}>With {title}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AppointmentCard
