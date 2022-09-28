import { COLORS } from 'utils/config/colors'

export const lightTheme = {
    primary: {
      main: COLORS.primaryBlue,
      light: COLORS.backgroundImageGray,
      dark: COLORS.DarkColor,
      contrastText: COLORS.darkSecondary,
    },
    secondary: {
      main: COLORS.darkSecondary,
      light: COLORS.graySecondary,
      dark: COLORS.darkSecondary,
      contrastText: COLORS.primaryBlue,
    },
    background: {
      default: COLORS.whiteColor,
      paper: COLORS.whiteColor,
    },
    text: {
      primary: COLORS.blackBackground,
      secondary: COLORS.lightBlueText,
      disabled: COLORS.graySecondary,
    },
    info: {
      main: COLORS.blueColor,
      light: COLORS.grey50,
      dark: COLORS.primaryBlue,
    },

    warning: {
      main: COLORS.lightBlue,
      light: COLORS.lightBlueColor,
      dark: COLORS.colorGreen,
    },
    grey: {
      50: COLORS.secondaryGray,
    },
    status: {
      danger: 'orange',
    },
}
