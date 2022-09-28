// @ts-nocheck
/* eslint-disable @next/next/link-passhref */
import React, { useState } from 'react'

import stylelo from 'pages/doctors/laboratory/result/style.module.css'
import styles from './style.module.css'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import ActivityCard from 'containers/ActivityCard'
import { useDoctorActivity } from 'network/ReactQuery/Queries/Activity/useActivity'
import { ACTIVITY_INITIAL_PAGE } from 'constants/constants'
import { groupArrayBasedOnDate } from 'utils/groupArrayByDate'
import moment from 'moment'

const DashboardLayout = dynamic(
  () => import('containersDoctors/DashboardLayout'),
  { ssr: false }
)
const Activities = () => {
  const getDayFromMomentCalendar = (date) => {
    return date.split(' ')[0]
  }
  const [page, setPage] = useState(ACTIVITY_INITIAL_PAGE)
  const { allActivities } = useDoctorActivity(page)
  const groupedActivities = groupArrayBasedOnDate(allActivities)
  return (
    <>
      <Head>
        <title>Activities -- BetaCare</title>
      </Head>
      <div className={stylelo.addFlex}>
        <div className={stylelo.positionLabby}>
          <div className={stylelo.labby}>Activity</div>
          <div className={stylelo.labbyMini}>
            Stay up to date with what&apos;s happening
          </div>
        </div>
      </div>

      <div className={stylelo.card}>
        {groupedActivities?.map((activity, index) => (
          <>
            <ActivityCard
              key={index}
              data={activity.activities}
              dayOfInterest={getDayFromMomentCalendar(
                moment(activity.date).calendar()
              )}
              dateOfInterest={activity.date}
            />
            <div className={styles.divider}></div>
          </>
        ))}
      </div>

      <div className={stylelo.flexify}></div>
    </>
  )
}

Activities.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Activities
