import React, { useEffect, useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { getCustomTheme } from '../lib/MaterialUI/theme'
import { RecoilRoot } from 'recoil'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import nProgress from 'nprogress'
import 'styles/nprogress.css'
import { SearchContextProvider } from '../context/SearchContext'
// import { CallContextProvider } from 'context/callContext'
Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import 'styles/globals.css'
import createEmotionCache from 'utils/createEmotionCache'
import 'react-multi-carousel/lib/styles.css'
import PropTypes from 'prop-types'
import { ColorModeContext } from 'context/colorModeContext'
// import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import { PaletteMode } from 'types'
const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

const IncomingCall = dynamic(() => import('containers/IncomingCall'), {
  ssr: false,
})

const CallContextProvider = dynamic(
  () => import('context/callContext').then((mod) => mod.CallContextProvider),
  {
    ssr: false,
  }
)

export default function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? ((page: any) => page)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [themeMode, setThemeMode] = useState<PaletteMode>('light')
  const DEFAULT_THEME_MODE: PaletteMode = 'light'

  // suppress server-side warning
  if (typeof window === 'undefined') React.useLayoutEffect = () => {}

  useEffect(() => {
    const newMode = localStorage.getItem('colorMode')
    if (newMode === 'dark' || newMode === 'light') {
      setThemeMode(newMode)
    } else {
      setThemeMode(prefersDarkMode ? 'dark' : DEFAULT_THEME_MODE)
    }
  }, [prefersDarkMode])

  const toggleColorMode = () => {
    const newThemeMode: PaletteMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newThemeMode)
    localStorage.setItem('colorMode', newThemeMode)
  }

  const theme = React.useMemo(
    () => responsiveFontSizes(createTheme(getCustomTheme(themeMode))),
    [themeMode]
  )

  return getLayout(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ColorModeContext.Provider value={{ themeMode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
              <CacheProvider value={emotionCache}>
                <SearchContextProvider>
                  <CssBaseline />
                  <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                  />
                  <Component {...pageProps} />
                  <IncomingCall />
                </SearchContextProvider>
              </CacheProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </RecoilRoot>
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
      </QueryClientProvider>
    </React.StrictMode>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
