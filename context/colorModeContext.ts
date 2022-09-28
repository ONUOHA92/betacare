import { createContext } from 'react'

type ThemeMode = 'light' | 'dark'
interface IColorModeContext {
  themeMode: ThemeMode
  toggleColorMode: () => void
}

export const ColorModeContext = createContext<IColorModeContext>(
  {} as IColorModeContext
)
