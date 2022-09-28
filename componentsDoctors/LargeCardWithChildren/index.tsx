import * as React from 'react'
import styles from './style.module.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Button from '../Button'

interface Props {
  wd?: string
  maxw?: string
  hg?: string
  icon?: string
  title?: string
  text?: string
  btn?: boolean
  children?: any
  smallBtn?: boolean
  removeMargins?: boolean
  alignTitle?: boolean
}

const LargeCardWithChildren = ({
  wd,
  hg,
  icon,
  title,
  text,
  btn,
  children,
  smallBtn,
  removeMargins,
  maxw,
  alignTitle,
}: React.PropsWithChildren<Props>) => {
  return (
    <Card
      sx={{ width: wd, height: hg }}
      className={`${styles.addBoxShadow} ${maxw ? styles.maxWidth : ''}`}
    >
      <CardContent>
        {!smallBtn ? (
          <div
            className={`${styles.inner} ${
              removeMargins ? styles.removeMargins : ''
            }`}
          >
            <div
              className={`${
                alignTitle && title !== 'Requested appointments'
                  ? styles.pushtitle
                  : title === 'Requested appointments'
                  ? styles.pushtitle2
                  : ''
              }`}
            >
              {title}
            </div>
          </div>
        ) : (
          <div
            className={`${styles.innerFlex} ${styles.innerFlex2} ${
              smallBtn ? styles.pushUp : ''
            }`}
          >
            <div>{title}</div>
            <Button
              wd="50px"
              hg="50px"
              color="secondary"
              className={`${styles.presBtn} ${styles.adjustMarginBtn} ${styles.labBtn}`}
            >
              See more{' '}
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 12L5.5 7L0.5 2L1.5 0L8.5 7L1.5 14L0.5 12Z"
                  fill="#1F56C3"
                />
              </svg>
            </Button>
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  )
}

export default LargeCardWithChildren
