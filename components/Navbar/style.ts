import { getCustomTheme } from 'lib/MaterialUI/theme'
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
  backgroundColor: 'background.default',
  bottomBorder: 0,
  borderWidth: 'none',
  zIndex: 1,
  width: '100%',
  overflow: 'hidden',
  p:{ lg:5},
  pb:{lg:1},
  pt:{xs:2,sm:4}
}

export const menuOrign = {
  vertical: 'center',
  horizontal: 'center',
}

export const linkStyle = {
  textDecoration: 'none',
  color: "primary.contrastText",
  textTransform: 'none',
  textAlign: 'center',
  flexGrow: 0.5,
}

export const switchStyle = {
  color: COLORS.linkColors,
  textTransform: 'none',
  textAlign: 'center',
  fontSize: '5px',
  mt: { xs: 0, md: 2 },
  position: 'fixed',
  bottom: 10,
  right: 0,
}
export const getStartedButton = {
  padding: '15px 60px',
  border: '1px solid',
  borderColor: "text.primary",
  color: "text.primary",
  borderRadius: '12px',
  textTransform: 'capitalize',
  fontWeight:800,
  fontSize:"18px",
  '&:hover': {
    backgroundColor: "primary.main",
    color: COLORS.whiteColor,
  },
}

export const logoButtonStyle = {
  width: { xs: '150px', sm: '200px' },
  height: { xs: '40px', sm: '50px' },
  mt:-2,
}
