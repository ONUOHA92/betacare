import Topbar from 'containers/TopBar'
import Image from 'next/image'
import React from 'react'
// import logo from 'public/images/sub_logo.svg'
import styles from './style.module.css'
import SubscriptionBox from 'components/SubscriptionBox'
import {
  basicPlan,
  accessPlan,
  weeklyPlan,
  monthlyPlan,
  monthlyFamilyPlan,
  corporateMonthlyPlan,
} from '../../utils/SubscriptionPlan'
import { differentSubPlans } from 'utils/subscriptionPlans'


function Subscription() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.textGroup}>
          <div className={styles.blueText}>Our Pricing</div>
        </div>
        <div className={styles.boxes}>
          <SubscriptionBox
            title="Starters"
            desc="Maximum 1 user"
            amount="0.00"
            pkg={basicPlan}
          />
          <SubscriptionBox
            title="Basic"
            desc="Maximum 1 user"
            amount="100.00"
            pkg={accessPlan}
          />
          <SubscriptionBox
            title="LiteHealth"
            desc="Maximum 1 user"
            amount="150.00"
            pkg={weeklyPlan}
          />
          <SubscriptionBox
            title="Premium"
            desc="Maximum 1 user"
            amount="500.00"
            pkg={monthlyPlan}
          />
          <SubscriptionBox
            title="Family"
            desc="1 - 5 Capacity Users"
            amount="2000.00"
            pkg={monthlyFamilyPlan}
          />
          <SubscriptionBox
            title=" Corporate"
            desc="6 - 10k Capacity Users"
            amount="400.00"
            pkg={corporateMonthlyPlan}
          />

        </div>
      </div>
    </div>
  )
}

export default Subscription
