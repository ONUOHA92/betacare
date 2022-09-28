import React, { useState } from 'react'
import DashboardLayout from 'containers/AdminDashboardLayout'
import Head from 'next/head'
import styles from './style.module.css'
import Button from 'components/Button'
import AddThirdParty from 'containers/AddThirdParty'

import ThirdPartyList from 'containers/ThirdPartyList'

const ThirdParty = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Head>
        <title>Third-party -- BetaCare</title>
      </Head>
      {openModal && (
        <AddThirdParty openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <div className={styles.flexify}>
        <div className={styles.labby}>
          Third party users
          <span className={styles.logCount}>(30)</span>
        </div>
        <Button
          wd="244px"
          hg="45px"
          color="secondary"
          className={styles.firstBtn}
          onClick={() => setOpenModal(true)}
        >
          <span className={styles.btnText}>Add new</span>
        </Button>
      </div>
      <ThirdPartyList setState={undefined} />
    </>
  )
}

ThirdParty.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default ThirdParty
