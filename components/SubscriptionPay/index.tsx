import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import CurrentPlan from 'containers/CurrentPlan'
import {
  accessPlan,
  weeklyPlan,
  monthlyPlan,
  monthlyFamilyPlan,
} from 'utils/subscriptionPlans'
import OtherPlanBox from 'containers/OtherPlanBox'
import Popups from 'components/Popup'
import { useGetSubscription } from 'network/ReactQuery/Queries/Subscription/useSubscription'
import { detectPlanTitle } from 'utils/planTypesGenerator'


const SubscriptionPay = () => {
  const initialSetting = [
    {
      title: 'Basic',
      desc: 'Maximum 1 user',
      amount: '100.00',
      pkg: accessPlan,
    },
    {
      title: 'LiteHealth',
      desc: 'Maximum 1 user',
      amount: '150.00',
      pkg: weeklyPlan,
    },
    {
      title: 'Premium',
      desc: 'Maximum 1 user',
      amount: '500.00',
      pkg: monthlyPlan,
    },
    {
      title: 'Family',
      desc: 'Maximum 1-5 users',
      amount: '2000.00',
      pkg: monthlyFamilyPlan,
    },
  ]

  const { currentSubscription } = useGetSubscription()

  const newPlanMap = initialSetting.filter(
    (item) => item?.title !== detectPlanTitle(currentSubscription)
  )

  const [open, setOpen] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)

  const handleAction = () => {
    setOpen(false)
    setOpenSuccess(true)
  }

  return (
    <>

      <div className={styles.formContainer}>
        <div className={styles.formContainerForm}>
          <div className={styles.planContainer}>
            <div className={styles.currentPlan}>Current plan</div>
            {currentSubscription && (
              <CurrentPlan
                setOpen={() => setOpen(true)}
                currentSubscription={currentSubscription}
              />
            )}

            <div className={styles.otherPlan}>Other plans</div>
            <div className={styles.otherPlansContainer}>
              {currentSubscription &&
                newPlanMap &&
                newPlanMap?.map((item) => (
                  <OtherPlanBox
                    key={item.amount}
                    title={item.title}
                    desc={item.desc}
                    amount={item.amount}
                    pkg={item.pkg}
                  />
                ))}
            </div>
          </div>
        </div>
        <Popups
          isOpen={open}
          current="cancelPlan"
          handleClose={() => setOpen(false)}
          handleAction={handleAction}
        />
        <Popups
          isOpen={openSuccess}
          current="cancelPlanSuccess"
          handleClose={() => setOpenSuccess(false)}
        />
      </div>
    </>
  )
}

export default SubscriptionPay
