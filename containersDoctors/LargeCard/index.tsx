import * as React from 'react'
import styles from './style.module.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { routes_doctor } from 'utils/routes'

interface Props {
  wd?: string
  hg?: string
  icon?: string
  title?: string
  text?: string
  flexify?: boolean
  btn?: boolean
  addMarginTop?: boolean
}

const LargeCard = ({
  wd,
  hg,
  icon,
  title,
  text,
  btn,
  flexify,
  addMarginTop,
}: React.PropsWithChildren<Props>) => {
  const router = useRouter()
  return (
    <Card
      className={`${styles.addBoxShadow} ${flexify ? styles.flexifier : ''} `}
      sx={{ maxWidth: wd, width: '100%', height: hg }}
    >
      <CardContent>
        <div className={styles.inner}>
          <div>{title}</div>
        </div>
        <div
          className={` ${styles.wrapper} ${
            addMarginTop ? styles.addMarginTop : ''
          }`}
        >
          <div className={styles.icon}>
            <Image src={icon} alt="" />
            <div>{text}</div>
          </div>
        </div>
        <div className={styles.btn}>
          {btn && (
            // @ts-ignore
            <Button
              wd="213px"
              hg="50px"
              color="secondary"
              className={styles.dbtn}
              onClick={() => router.push(routes_doctor.DOCTORS_APPOINTMENTS)}
            >
              Book Appointment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default LargeCard
