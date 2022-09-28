import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import styles from './style.module.css'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { CLOSE_SVG } from 'assets/icon'

interface Props {
  open?: boolean
  wd?: string
  hg?: string
  handleClose?: () => void
  noClose?: boolean
  bg?: string
  bx?: string
}

const BlankCardModal = ({
  open,
  wd,
  hg,
  handleClose,
  children,
  noClose,
  bg,
  bx,
}: React.PropsWithChildren<Props>) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: wd ? wd : '400px',
    maxWidth: '100%',
    height: hg ? hg : '300px',
    bgcolor: bg ? bg : 'background.paper',
    boxShadow: bx ? bx : 24,
    overflowY: 'auto',
    p: 4,
    borderRadius: '6px',
  }
  return (
    <div className={styles.mainModal}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {noClose ? null : (
            <div className={styles.customizer}>
              <IconButton
                className={styles.customizedbutton}
                onClick={handleClose}
              >
                <Image src={CLOSE_SVG} alt="close" width={24} height={24} />
              </IconButton>
            </div>
          )}
          {children}
        </Box>
      </Modal>
    </div>
  )
}

export default BlankCardModal
