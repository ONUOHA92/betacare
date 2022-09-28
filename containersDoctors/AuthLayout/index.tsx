/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './style.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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

  const handleReturnBack = () => {
    history.back()
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
          <img src={image} alt="back arrow" />
        </section>
        <section className={styles.content}>
          <div
            className={styles.signArrowback}
            onClick={() => handleReturnBack()}
          >
            <ArrowBackIcon fontSize="large" />
          </div>
          <div className={styles.children}>{children}</div>
        </section>
      </div>
    </motion.main>
  )
}

export default AuthContainer
