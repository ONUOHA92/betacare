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
}

const LabCardWithChildren = ({
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
            <div>{title}</div>
          </div>
        ) : (
          <div
            className={`${styles.innerFlex} ${styles.innerFlex2} ${
              smallBtn ? styles.pushUp : ''
            }`}
          >
            <div className={styles.putTogether}>
              {' '}
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.99998 0.199951L8.99998 6.19995L15 0.199951L17.4 1.39995L8.99998 9.79995L0.599976 1.39995L2.99998 0.199951Z"
                  fill="black"
                />
              </svg>
              {title}
            </div>
            <Button
              wd="214px"
              hg="52px"
              color="secondary"
              className={`${styles.presBtn} ${styles.adjustMarginBtn} ${styles.labBtn}`}
            >
              New Request{' '}
            </Button>
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  )
}

export default LabCardWithChildren
