import React from 'react'
import styles from './style.module.css'

interface Props {
  title: string
  desc: string
  amount: string
  pkg: string[]
}

const OtherPlanBox = ({
  title,
  desc,
  amount,
  pkg,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      <div className={styles.otherPlanBox}>
        <div className={styles.type}>{title}</div>
        <div className={styles.span}>{desc}</div>
        <div className={styles.amount}>₦ {amount}</div>

        {pkg &&
          pkg?.map((item) => (
            <div className={styles.listing}>
              <div>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="17" height="17" rx="8.5" fill="#EDF2FB" />
                  <g clip-path="url(#clip0_3703_57929)">
                    <path
                      d="M11.4304 6.0981L6.8241 10.7041C6.79313 10.7352 6.75632 10.7599 6.71579 10.7767C6.67527 10.7935 6.63181 10.8022 6.58793 10.8022C6.54405 10.8022 6.50059 10.7935 6.46007 10.7767C6.41954 10.7599 6.38273 10.7352 6.35176 10.7041L4.57043 8.9211C4.53946 8.89 4.50266 8.86533 4.46213 8.8485C4.4216 8.83167 4.37815 8.823 4.33426 8.823C4.29038 8.823 4.24693 8.83167 4.2064 8.8485C4.16587 8.86533 4.12907 8.89 4.0981 8.9211C4.067 8.95207 4.04233 8.98887 4.0255 9.0294C4.00867 9.06993 4 9.11338 4 9.15726C4 9.20115 4.00867 9.2446 4.0255 9.28513C4.04233 9.32565 4.067 9.36246 4.0981 9.39343L5.8801 11.1751C6.06808 11.3627 6.32283 11.4681 6.58843 11.4681C6.85403 11.4681 7.10878 11.3627 7.29676 11.1751L11.9028 6.5701C11.9338 6.53913 11.9584 6.50235 11.9752 6.46185C11.992 6.42136 12.0007 6.37794 12.0007 6.3341C12.0007 6.29025 11.992 6.24684 11.9752 6.20634C11.9584 6.16584 11.9338 6.12906 11.9028 6.0981C11.8718 6.067 11.835 6.04233 11.7945 6.0255C11.7539 6.00867 11.7105 6 11.6666 6C11.6227 6 11.5793 6.00867 11.5387 6.0255C11.4982 6.04233 11.4614 6.067 11.4304 6.0981Z"
                      fill="#1F56C3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3703_57929">
                      <rect
                        width="8"
                        height="8"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className={styles.text}>{item}</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default OtherPlanBox
