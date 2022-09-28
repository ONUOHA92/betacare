import React, { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
} from '@mui/material'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { Colors } from 'constants/index'

import { patient_routes, routes_doctor } from 'utils/routes'
import { drawerStyle, getStartedButtonDrawer } from './style'
import { DRAWER_LINKS, ROUTES } from 'navigation/routes'


function NavDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Box>
      <Drawer
        open={openDrawer}
        onClose={handleOpenDrawer}
        PaperProps={{
          sx: drawerStyle,
        }}
      >
        <List>
          {DRAWER_LINKS.map((drawerLink, index) => (
            <ListItem onClick={handleOpenDrawer} key={index}>
              <ListItemText>
                <Link href={drawerLink.link}>{drawerLink.name}</Link>
              </ListItemText>
            </ListItem>
          ))}
          <ListItem onClick={handleOpenDrawer}>
            <ListItemText>
              <Button sx={getStartedButtonDrawer}>
                <Link href={ROUTES.signUp}>{'Get Started'}</Link>
              </Button>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: Colors.copyRightColor }} />
      </IconButton>
    </Box>
  )
}

export default NavDrawer
