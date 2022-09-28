import React, { useState } from 'react'
import DashboardLayout from 'containers/AdminDashboardLayout'
import styles from './style.module.css'
import Head from 'next/head'
import Button from 'components/Button'
import Image from 'next/image'
// images
import Nothing from 'public/images/admin/nothing.png'
import Handgel from 'public/images/admin/handgel.png'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { IconButton, Pagination } from '@mui/material'
import AddDrug from 'containers/AddDrug'
import { admin_routes } from 'utils/routes'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const SingleThirdParty = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Head>
        <title>Third-party -- BetaCare</title>
      </Head>
      {openModal && (
        <AddDrug openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <div className={styles.flexify}>
        <IconButton>
          <a href={admin_routes.THIRD_PARTY}>
            <KeyboardBackspaceIcon fontSize="large" />
          </a>
        </IconButton>
      </div>
      <div className={styles.flexify}>
        <div className={styles.labby}>Mainland Hospital Yaba</div>
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
      <div className={styles.partyBox2}>
        {/* <Image src={Nothing} width={316} height={176} alt="nothing" /> */}
        <Card sx={{ maxWidth: 213 }} className={styles.card}>
          <Image
            src={Handgel}
            width={213}
            height={176}
            alt="nothing"
            className={styles.image}
          />
          <div className={styles.more__info}>
            <div className={styles.labbyMini}>Antibacterial handgel</div>
            <div className={styles.info__details}>
              <div className={styles.labby}>&#8358;1,000</div>
              <div className={styles.labbyMini}>100ml</div>
            </div>
          </div>
        </Card>
        <Card sx={{ maxWidth: 213 }} className={styles.card}>
          <Image
            src={Handgel}
            width={213}
            height={176}
            alt="nothing"
            className={styles.image}
          />
          <div className={styles.more__info}>
            <div className={styles.labbyMini}>Antibacterial handgel</div>
            <div className={styles.info__details}>
              <div className={styles.labby}>&#8358;1,000</div>
              <div className={styles.labbyMini}>100ml</div>
            </div>
          </div>
        </Card>
        <Card sx={{ maxWidth: 213 }} className={styles.card}>
          <Image
            src={Handgel}
            width={213}
            height={176}
            alt="nothing"
            className={styles.image}
          />
          <div className={styles.more__info}>
            <div className={styles.labbyMini}>Antibacterial handgel</div>
            <div className={styles.info__details}>
              <div className={styles.labby}>&#8358;1,000</div>
              <div className={styles.labbyMini}>100ml</div>
            </div>
          </div>
        </Card>
        <Card sx={{ maxWidth: 213 }} className={styles.card}>
          <Image
            src={Handgel}
            width={213}
            height={176}
            alt="nothing"
            className={styles.image}
          />
          <div className={styles.more__info}>
            <div className={styles.labbyMini}>Antibacterial handgel</div>
            <div className={styles.info__details}>
              <div className={styles.labby}>&#8358;1,000</div>
              <div className={styles.labbyMini}>100ml</div>
            </div>
          </div>
        </Card>
        <Card sx={{ maxWidth: 213 }} className={styles.card}>
          <Image
            src={Handgel}
            width={213}
            height={176}
            alt="nothing"
            className={styles.image}
          />
          <div className={styles.more__info}>
            <div className={styles.labbyMini}>Antibacterial handgel</div>
            <div className={styles.info__details}>
              <div className={styles.labby}>&#8358;1,000</div>
              <div className={styles.labbyMini}>100ml</div>
            </div>
          </div>
        </Card>
        <Card sx={{ maxWidth: 213 }} className={styles.card}>
          <Image
            src={Handgel}
            width={213}
            height={176}
            alt="nothing"
            className={styles.image}
          />
          <div className={styles.more__info}>
            <div className={styles.labbyMini}>Antibacterial handgel</div>
            <div className={styles.info__details}>
              <div className={styles.labby}>&#8358;1,000</div>
              <div className={styles.labbyMini}>100ml</div>
            </div>
          </div>
        </Card>
      </div>
      <div className={styles.counts}>
        <div className={styles.show}>
          <p>Show page 1 of 20</p>
        </div>
        <div className={styles.pagination}>
          <Pagination
            count={7}
            shape="rounded"
            siblingCount={0}
            size="small"
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#D4D5DB',
              },
              '& .MuiPaginationItem-root': {
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: '21px',
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

SingleThirdParty.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default SingleThirdParty
