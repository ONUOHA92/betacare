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
  hospital?: string
  status?: string
}

const PharmacyCard = ({
  wd,
  hg,
  name,
  title,
  status,
  hospital,
}: React.PropsWithChildren<Props>) => {
  const dynamicStatus = (status: string) => {
    if (status === 'Order processing') {
      return styles.orange
    } else if (status === 'Ready for delivery') {
      return styles.green
    } else {
      return styles.blue
    }
  }

  return (
    <Card
      sx={{ width: wd, height: hg }}
      className={`${styles.addBoxShadow} ${styles.one}`}
      style={{ backgroundColor: 'rgba(162, 192, 247, 0.2)' }}
    >
      <CardContent>
        <div className={styles.flexPharm}>
          <div className={styles.leftPharm}>
            <div className={styles.firstPharm}>{name}</div>
            <div className={styles.secondPharm}>{hospital}</div>
          </div>
          <div className={`${styles.thirdPharm} ${dynamicStatus(status)}`}>
            {status}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PharmacyCard
