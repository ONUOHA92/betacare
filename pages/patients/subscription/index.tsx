import Topbar from 'containers/TopBar'
import Image from 'next/image'
import React from 'react'
import logo from 'public/images/sub_logo.svg'
import styles from './style.module.css'
import SubscriptionBox from 'containers/SubscriptionBox'
import { differentSubPlans } from 'utils/subscriptionPlans'
import Link from 'next/link'
import Footer from 'components/Footer'

function Subscription() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.top}>
          <Link href="/patients/dashboard" passHref>
            <Image src={logo} alt="logo" style={{ cursor: 'pointer' }} />
          </Link>
          <Topbar />
        </div>
        <div className={styles.container}>
          <div className={styles.textGroup}>
            <div className={styles.blueText}>Personalized plans for you</div>
            <div className={styles.greyText}>
              Choose a plan that works best for you.
            </div>
          </div>
          <div className={styles.boxes}>
            {differentSubPlans?.map((subscription) => (
              <SubscriptionBox
                key={subscription.id}
                title={subscription.title}
                desc={subscription.desc}
                amount={subscription.amount}
                pkg={subscription.pkg}
                id={subscription.id}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer removeMargin={true} />
    </>
  )
}

export default Subscription
