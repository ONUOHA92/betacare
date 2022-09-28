import { PaletteMode } from 'types'
import { COLORS } from 'utils/config/colors'
import { darkTheme } from './darkTheme'
import { lightTheme } from './lightTheme'

const mode = {
  light: lightTheme,
  dark: darkTheme,
}

export const getCustomTheme = (themeMode: PaletteMode) => ({
  palette: {
    mode: themeMode,
    ...mode[themeMode],
  },
  typography: {
    fontFamily: 'Poppins, Avenir, Roboto, sans-serif',
    fontSize: 14,

    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 'regular',
    },
    button: {
      fontSize: '1.2rem',
      fontWeight: 'medium',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: '',
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: COLORS.backgroundImageGray,
          color: COLORS.whiteColor,
        },
        button: {
          borderRadius: '12px',
        },
      },
    },
  },
})
