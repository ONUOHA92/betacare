import { useState, createContext } from 'react'

export const DrawerContext = createContext()

export const DrawerContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  //This should be editted later on
  const [page, setPage] = useState('/patients/dashboard')

  const openDrawer = (current) => {
    setIsOpen(true)
    setCurrent(current)
  }

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const changeCurrent = (curr) => {
    setCurrent(curr)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const changePage = (newpage) => {
    setPage(newpage)
  }

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
        current,
        changeCurrent,
        isMenuOpen,
        toggleMenu,
        page,
        changePage,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
