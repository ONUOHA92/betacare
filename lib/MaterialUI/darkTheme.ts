import { COLORS } from 'utils/config/colors'

export const darkTheme = {
    primary: {
      main: COLORS.bluePrimary,
      light: COLORS.whitePrimary,
      dark: COLORS.darkBluePrimary,
      contrastText: COLORS.darkText,
    },
    secondary: {
      main: COLORS.graySecondary,
      light: COLORS.lightGraySecondary,
      dark: COLORS.lightBlueSecondary,
      contrastText: COLORS.darkSecondary,

    },
    background: {
      default: COLORS.blackBackground,
      paper: COLORS.blackBackground,
    },
    text: {
      primary: COLORS.whiteColor,
      secondry: COLORS.darkSecondary,
      disabled: COLORS.graySecondary,
    },
    action:{
      active: COLORS.bluePrimary,
      hover: COLORS.bluePrimary,
      selected: COLORS.bluePrimary,
      disabled: COLORS.graySecondary,
      disabledBackground: COLORS.blackBackground,
    },
    info: {
      main: COLORS.paleBlue,
      light: COLORS.grey50,
      dark: COLORS.colorGreen,
    },

    warning: {
      main: COLORS.lightBlue,
      light: COLORS.lightBlueColor,
      dark: COLORS.colorGreen,
    },
    grey: {
      50: COLORS.grey50,
    },
    status: {
      danger: 'orange',
    },
  
}
