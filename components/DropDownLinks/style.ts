import { textAlign } from '@mui/system'
import { COLORS } from 'utils/config/colors'

export const navlinks = {
  marginLeft: 10,
  display: 'flex',
  flexGrow: '6',
  postion: 'fixed',
}

export const logoContainer = {
  flexGrow: '1',
  cursor: 'pointer',
}

export const navbar = {
  // backgroundColor: `${theme.palette.primary.main}`,
  bottomBorder: 0,
  borderWidth: 'none',
  zIndex: 1,
  width: '100%',
  overflow: 'hidden',
}

export const menuOrign = {
  vertical: 'center',
  horizontal: 'center',
}

export const linkStyle = {
  textDecoration: 'none',
  color: "primary.contrastText",
  textTransform: 'none',
  fontSize: '18px',
}

export const linksStyle = {
  textDecoration: 'none',
  paddingTop: '8px',
  color: COLORS.DarkColor,
}
