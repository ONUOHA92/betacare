/* eslint-disable @next/next/no-img-element */
// import Logo from 'components/Logo'
import Spinner from 'components/Spinner'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import styles from './style.module.css'
import Link from 'next/link'
import { patient_routes } from 'utils/routes'
import { motion } from 'framer-motion'

type Props = {
  bgSize: 'big' | 'small'
  image: string
}

const AuthContainer = ({
  bgSize,
  image,
  children,
}: React.PropsWithChildren<Props>) => {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
    >
      <div className={bgSize === 'big' ? styles.mainBg : styles.mainSm}>
        <section className={styles.hero}>
          <img src={image} alt="users images" />
        </section>
        <section className={styles.content}>
          <div className={styles.ArrowBack}>
            <Link href={patient_routes.PATIENTS_LANDING} passHref>
              <ArrowBackIcon fontSize="large" />
            </Link>
          </div>

          {/* <Logo /> */}
          <div className={styles.children}>{children}</div>
        </section>
      </div>
    </motion.main>
  )
}

export default AuthContainer
