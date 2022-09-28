import React from 'react'

import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box, IconButton, Typography } from '@mui/material'
import { DROP_DOWN_ICON } from 'assets/icon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { linkStyle, linksStyle } from './style'

interface Props {
  links: Record<any, any>
}

function DropDownLinks({ links }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        sx={linkStyle}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Typography>More</Typography>
        <ExpandMoreIcon sx={{color:"primary.contrastText", mt:0.5}}  />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        style={{ padding: 50 }}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            transform: 'translateX(-10px) translateY(50px)',
            zIndex: 1,
          },
        }}
      >
        {links?.map((link: any, index: any) => (
          <MenuItem onClick={handleClose} key={index}>
            <Box sx={{ linksStyle }}>
              <Link href={link?.link}>{link?.name}</Link>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default DropDownLinks
