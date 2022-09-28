import { Drawer } from '@mui/material'
import React from 'react'

type Props = {
  isOpen: boolean
  current: 'cart' | 'order' | 'success'
  handleClose: () => void
}

const SideDrawer = ({ isOpen, current, handleClose }: Props) => {
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          paddingX: { xs: '0.5em', md: '2em' },
          paddingY: '2.5em',
          width: { xs: '95vw', md: '30vw' },
        },
      }}
    ></Drawer>
  )
}

export default SideDrawer
