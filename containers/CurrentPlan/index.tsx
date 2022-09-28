import Button from 'components/Button'
import { ICurrentPlan } from 'interface/subscription'
import React from 'react'
import { planAmountGenerator } from 'utils/planTypesGenerator'
import styles from './style.module.css'

function CurrentPlan({
  setOpen,
  currentSubscription,
}: {
  setOpen: () => void
  currentSubscription: ICurrentPlan
}) {
  return (
    <>
      <div className={styles.roundBox}>
        <div className={styles.positionAbsolutely}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z"
              fill="#1F56C3"
            />
            <path
              d="M10.6951 15.5001C10.4331 15.495 10.1835 15.3873 10.0001 15.2001L7.30513 12.4351C7.12014 12.2448 7.01832 11.9888 7.02207 11.7234C7.02582 11.4581 7.13484 11.2051 7.32513 11.0201C7.51542 10.8351 7.77141 10.7333 8.03677 10.737C8.30213 10.7408 8.55514 10.8498 8.74013 11.0401L10.7401 13.1001L15.3301 8.77508C15.5251 8.60536 15.7782 8.51772 16.0363 8.53053C16.2945 8.54333 16.5376 8.6556 16.7148 8.84378C16.892 9.03196 16.9894 9.28143 16.9867 9.53989C16.984 9.79834 16.8813 10.0457 16.7001 10.2301L11.3951 15.2301C11.2057 15.4075 10.9547 15.5043 10.6951 15.5001Z"
              fill="white"
            />
          </svg>
        </div>
        <div className={styles.topDiv}>
          <div>
            <div className={styles.topo1}>{currentSubscription?.planType}</div>
            <div className={styles.topo2}>
              {currentSubscription?.subscriptionStatus}
            </div>
          </div>
          <div>
            <span className={styles.amount}>
              N{planAmountGenerator(currentSubscription.planType)}.00
            </span>
            <span className={styles.month}>
              /{currentSubscription?.planType?.toLowerCase()}
            </span>
          </div>
        </div>
        <div className={styles.buttonDiv}>
          <Button wd="150px" color="neutral-blue" onClick={() => setOpen()}>
            Cancel Plan
          </Button>
        </div>
      </div>
    </>
  )
}

export default CurrentPlan
