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
import { patient_routes } from 'utils/routes'

interface Props {
  wd?: string
  hg?: string
  icon?: string
  title?: string
  text?: string
  btn?: boolean
}

const LargeCard = ({
  wd,
  hg,
  icon,
  title,
  text,
  btn,
}: React.PropsWithChildren<Props>) => {
  const router = useRouter()
  return (
    <Card
      className={styles.addBoxShadow}
      sx={{
        maxWidth: wd,
        width: '100%',
        maxHeight: hg || '100%',
      }}
    >
      <CardContent>
        <div className={styles.inner}>
          <div>{title}</div>
        </div>
        <div className={styles.wrapper}>
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
              onClick={() => router.push(patient_routes.APPOINTMENTS)}
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
