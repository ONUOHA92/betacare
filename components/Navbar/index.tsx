import React, { useContext } from 'react'
import {
  AppBar,
  Box,
  FormControlLabel,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from 'public/images/home/logoBeta.png'
import NavDrawer from 'components/NavDrawer'
import Button from '@mui/material/Button'

import {
  getStartedButton,
  linkStyle,
  logoButtonStyle,
  navbar,
  switchStyle,
} from './style'
import { MENU_DROP_DOWM_LINKS, NAV_LINKS, ROUTES } from 'navigation/routes'
import DropDownLinks from 'components/DropDownLinks'
import { ColorModeContext } from 'context/colorModeContext'
import Switch from 'components/Switch'
import { useRouter } from 'next/router'

function Navbar() {
  const navigate = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const colorModeContext = useContext(ColorModeContext)

  return (

    <AppBar sx={navbar} elevation={0} component="nav">
      <Toolbar>
        <IconButton
            size="small"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={logoButtonStyle}
            onClick={() => navigate.push(ROUTES.home)}
          >
            <Image src={logoImage} alt={`logo`} />
          </IconButton>

        {isMobile ? (
          <>
            <Box flexGrow={1} />
            <NavDrawer />
            <FormControlLabel
              sx={switchStyle}
              control={
                <Switch
                  defaultChecked
                  size="small"
                  onChange={colorModeContext.toggleColorMode}
                />
              }
              label=""
            />
          </>
        ) : (
          <>
            <Typography sx={linkStyle}>
              <Link href={NAV_LINKS[0].link}>{NAV_LINKS[0].name}</Link>
            </Typography>
            <Typography sx={linkStyle}>
              <Link href={NAV_LINKS[1].link}>{NAV_LINKS[1].name}</Link>
            </Typography>

            <DropDownLinks links={MENU_DROP_DOWM_LINKS} />
            <Box flexGrow={5} />
            <FormControlLabel
              sx={switchStyle}
              control={
                <Switch
                  defaultChecked
                  size="small"
                  onChange={colorModeContext.toggleColorMode}
                />
              }
              label=""
            />
            <Button sx={getStartedButton}>
              <Link href={NAV_LINKS[2].link}>{NAV_LINKS[2]?.name}</Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>

  )
}
export default Navbar
