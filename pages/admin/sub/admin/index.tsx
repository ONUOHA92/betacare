import React, { useState } from 'react'
import DashboardLayout from 'containers/AdminDashboardLayout'
import Head from 'next/head'
import styles from './style.module.css'
import Button from 'componentsDoctors/Button'
import Image from 'next/image'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Pagination } from '@mui/material'
import BlankCardModal from 'components/BlankCardModal'
import AddSubAdmin from 'containers/AddSubAdmin'
import SubAdminView from 'containers/SubAdminView'

const SubAdmins = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openModal, setOpenModal] = useState(false)
  const [openSubAdminModal, setOpenSubAdminModal] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setOpenSubAdminModal(true)
    setAnchorEl(null)
  }
  return (
    <>
      <Head>
        <title>Sub-admin -- BetaCare</title>
      </Head>
      {openModal && (
        <AddSubAdmin openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openSubAdminModal && (
        <SubAdminView
          openSubAdminModal={openSubAdminModal}
          setOpenSubAdminModal={setOpenSubAdminModal}
        />
      )}
      <div className={styles.flexify}>
        <div className={styles.labby}>Sub Users</div>
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
      <div className={styles.subs}>
        <div className={styles.sub}>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.more}
          >
            <MoreVertIcon />
          </IconButton>
          <Image
            src="/images/admin/sub-admin.png"
            width={100}
            height={100}
            alt="sub admin"
            className={styles.image}
          />
          <div className={styles.labby} style={{ marginTop: '10px' }}>
            Teejay Teko
          </div>
          <div className={styles.labbyMini}>Sub admin</div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem>Deactivate</MenuItem>
          </Menu>
        </div>
        <div className={styles.sub}>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.more}
          >
            <MoreVertIcon />
          </IconButton>
          <Image
            src="/images/admin/sub-admin.png"
            width={100}
            height={100}
            alt="sub admin"
            className={styles.image}
          />
          <div className={styles.labby} style={{ marginTop: '10px' }}>
            Teejay Teko
          </div>
          <div className={styles.labbyMini}>Sub admin</div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem>Deactivate</MenuItem>
          </Menu>
        </div>
        <div className={styles.sub}>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.more}
          >
            <MoreVertIcon />
          </IconButton>
          <Image
            src="/images/admin/sub-admin.png"
            width={100}
            height={100}
            alt="sub admin"
            className={styles.image}
          />
          <div className={styles.labby} style={{ marginTop: '10px' }}>
            Teejay Teko
          </div>
          <div className={styles.labbyMini}>Sub admin</div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem>Deactivate</MenuItem>
          </Menu>
        </div>
        <div className={styles.sub}>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.more}
          >
            <MoreVertIcon />
          </IconButton>
          <Image
            src="/images/admin/sub-admin.png"
            width={100}
            height={100}
            alt="sub admin"
            className={styles.image}
          />
          <div className={styles.labby} style={{ marginTop: '10px' }}>
            Teejay Teko
          </div>
          <div className={styles.labbyMini}>Sub admin</div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem>Deactivate</MenuItem>
          </Menu>
        </div>
        <div className={styles.sub}>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.more}
          >
            <MoreVertIcon />
          </IconButton>
          <Image
            src="/images/admin/sub-admin.png"
            width={100}
            height={100}
            alt="sub admin"
            className={styles.image}
          />
          <div className={styles.labby} style={{ marginTop: '10px' }}>
            Teejay Teko
          </div>
          <div className={styles.labbyMini}>Sub admin</div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem>Deactivate</MenuItem>
          </Menu>
        </div>
        <div className={styles.sub}>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.more}
          >
            <MoreVertIcon />
          </IconButton>
          <Image
            src="/images/admin/sub-admin.png"
            width={100}
            height={100}
            alt="sub admin"
            className={styles.image}
          />
          <div className={styles.labby} style={{ marginTop: '10px' }}>
            Teejay Teko
          </div>
          <div className={styles.labbyMini}>Sub admin</div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem onClick={handleClose}>Deactivate</MenuItem>
          </Menu>
        </div>
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

SubAdmins.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>
}
export default SubAdmins
