import { useState, createContext, useEffect } from 'react'

export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(true)
  return (
    <SearchContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
