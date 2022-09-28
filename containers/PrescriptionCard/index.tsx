// @ts-nocheck
import * as React from 'react'
import styles from './style.module.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { patient_routes } from 'utils/routes'

interface Props {
  key?: string
  wd?: string
  hg?: string
  icon?: string
  name?: string
  title?: string
  time?: string
  date?: string
  item?: string
  active?: boolean
  type?: string
  status?: string
}

const PrescriptionCard = ({
  wd,
  hg,
  name,
  title,
  date,
  icon,
  item,
  time,
  active,
  type,
  status,
  prescriptionId,
}: React.PropsWithChildren<Props>) => {
  return (
    <Card
      sx={{ width: wd, height: hg }}
      className={`${styles.addBoxShadow} ${
        type ? styles.marginBottomZero : ''
      }`}
      style={{ background: active ? '#1F56C3' : type ? '#F9F9FB' : '#EDF2FB' }}
    >
      <CardContent>
        <div className={styles.flexMe}>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.5 18.0001C10.5 18.0001 6 22.5001 3.75 20.2501C1.5 18.0001 2.25 15.0001 6 12.0001C9.75 9.00012 12 8.25012 13.5 11.2501M13.5 6.00012C13.5 6.00012 18 1.50012 20.25 3.75012C22.5 6.00012 21.75 9.00012 18 12.0001C14.25 15.0001 12 15.7501 10.5 12.7501L13.5 6.00012Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={active ? '#F9F9FB' : '#999999'}
              />
            </svg>
            <div style={{ color: active ? '#fff' : '#1F56C3' }}>{name}</div>
          </div>
          <div style={{ color: active ? '#fff' : '#666666' }}>{date}</div>
        </div>

        <span className={styles.border}> </span>

        <div className={styles.flexMee}>
          <div style={{ color: active ? '#fff' : '#333333' }}>
            {item}
            <div>{time}</div>
          </div>
          <div>
            <Button
              wd="50px"
              hg="50px"
              color="secondary"
              style={{ background: !active ? '#fff' : '' }}
              className={`${styles.dbtn} ${
                type === 'lab' ? styles.removePadding : ''
              }  ${
                type === 'lab' && status === 'processing' ? styles.process : ''
              }`}
            >
              {type !== 'lab' ? (
                <>
                  <span className={styles.transformUpper}>V</span>
                  <span>iew</span>
                </>
              ) : type === 'lab' && status === 'processing' ? (
                <>
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <span className={styles.transformUpper}>V</span>
                  <Link
                    href={`${patient_routes.LABORATORY}/result/${prescriptionId}`}
                    passHref
                  >
                    <span>iew result</span>
                  </Link>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PrescriptionCard
