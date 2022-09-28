import Button from 'components/Button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useSubscription } from 'network/ReactQuery/Mutations/Subscription/useSubscription'


interface Props {
  title: string
  desc: string
  amount: string
  pkg: string[]
  id: number
}

const SubscriptionBox = ({
  title,
  desc,
  amount,
  pkg,
  id,
}: React.PropsWithChildren<Props>) => {
  const { subscription, subscriptionLoading } = useSubscription()
  const [isShown, setIsShown] = useState(false)


  const handleAction = () => {
    if (id === 1) {
      subscription({
        subscriptionPlan: 'starter',
      })
    } else if (id === 2) {
      subscription({
        subscriptionPlan: 'BASIC',
      })
    } else if (id === 3) {
      subscription({
        subscriptionPlan: 'LiteHealth',
      })
    } else if (id === 4) {
      subscription({
        subscriptionPlan: 'Premium',
      })
    } else if (id === 5) {
      subscription({
        subscriptionPlan: 'Family',
      })
    } else {
      subscription({
        subscriptionPlan: 'Corporate',
      })
    }
  }



  return (
    <>

      <div
        className={`${styles.box} ${isShown ? styles.bgBlue : ''}`}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <div className={styles.topBox}>
          <div className={styles.topBox1}>
            <div
              className={`${styles.topBox1a} ${isShown ? styles.textWhite : ''
                }`}
            >
              {title}
            </div>

            <div
              className={`${styles.topBox1b} ${isShown ? styles.textWhite : ''
                }`}
            >
              {desc}
            </div>
          </div>
          <div
            className={`${styles.topBox1c} ${isShown ? styles.textWhite : ''}`}
          >{`N ${amount}`}</div>
        </div>
        <div className={styles.middleBox}>
          {pkg &&
            pkg?.map((item) => (
              <div key={item} className={styles.middleTop}>
                <div>
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0196 0.584755L4.95853 8.64525C4.90433 8.69967 4.83992 8.74284 4.769 8.7723C4.69808 8.80176 4.62203 8.81692 4.54523 8.81692C4.46844 8.81692 4.39239 8.80176 4.32147 8.7723C4.25055 8.74284 4.18614 8.69967 4.13194 8.64525L1.01461 5.525C0.960412 5.47059 0.896004 5.42742 0.825081 5.39796C0.754158 5.3685 0.678116 5.35334 0.601318 5.35334C0.52452 5.35334 0.448478 5.3685 0.377554 5.39796C0.306631 5.42742 0.242223 5.47059 0.188026 5.525C0.133615 5.5792 0.0904407 5.64361 0.0609814 5.71453C0.0315221 5.78546 0.0163574 5.8615 0.0163574 5.9383C0.0163574 6.01509 0.0315221 6.09114 0.0609814 6.16206C0.0904407 6.23298 0.133615 6.29739 0.188026 6.35159L3.30653 9.4695C3.6355 9.79786 4.08131 9.98228 4.54611 9.98228C5.01091 9.98228 5.45672 9.79786 5.78569 9.4695L13.8462 1.41075C13.9005 1.35657 13.9436 1.2922 13.973 1.22133C14.0024 1.15046 14.0176 1.07448 14.0176 0.997755C14.0176 0.921026 14.0024 0.845051 13.973 0.774182C13.9436 0.703313 13.9005 0.638941 13.8462 0.584755C13.792 0.530343 13.7276 0.487169 13.6567 0.45771C13.5857 0.428251 13.5097 0.413086 13.4329 0.413086C13.3561 0.413086 13.2801 0.428251 13.2091 0.45771C13.1382 0.487169 13.0738 0.530343 13.0196 0.584755Z"
                      fill={isShown ? '#fff' : '#1F56C3'}
                    />
                  </svg>
                </div>
                <div
                  className={`${styles.middleTopText} ${isShown ? styles.textWhite : ''
                    }`}
                >
                  {item}
                </div>
              </div>
            ))}
        </div>
        <div className={styles.bottomBox}>
          <Button
            wd="200px"
            hg="45px"
            color={isShown ? 'tertiary' : 'primary'}
            disabled={
              subscriptionLoading || title === 'Corporate Plan' || id === 1
                ? true
                : false
            }
            isLoading={subscriptionLoading}
            onClick={() => handleAction()}
          >
            Choose plan
          </Button>
          <Link href={'/'} passHref>
            <span
              className={`${styles.getInfo} ${isShown ? styles.textWhite : ''}`}
            >
              Get more information
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SubscriptionBox
