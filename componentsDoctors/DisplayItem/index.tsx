import Paper from 'componentsDoctors/Paper'
import React from 'react'
import StarNoFill from 'public/images/star-nofill.svg'
import Star from 'public/images/star.svg'
import StarHalf from 'public/images/star-half.svg'
import styles from './style.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@mui/material'
import RatingIcon from 'containersDoctors/RatingIcon'
import { dividerClasses } from '@mui/material'

interface Props {
  headding?: string
  smallText?: string
  icon?: string
  day?: string
  time?: string
}

const DisplayItem = ({ headding, smallText, icon, ...props }: Props) => {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon && <img src={icon} alt="" />}</div>

      <div className={styles.item_details}>
        {headding && <p className={styles.headding}>{headding}</p>}
        {smallText && <p className={styles.smallText}>{smallText}</p>}
        {props?.day && (
          <div className={styles.times}>
            <p>{props.day}</p> <p>{props.time}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayItem
