import { useEffect, useState } from 'react'
import constants from 'constants/constants'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window?.innerWidth <= constants.mobileBreakpoint
  )

  useEffect(() => {
    const handleResize = () => {
      if (window?.innerWidth <= constants.mobileBreakpoint) {
        if (!isMobile) {
          setIsMobile(true)
        }
      } else {
        if (isMobile) {
          setIsMobile(false)
        }
      }
    }

    window?.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window?.removeEventListener('resize', handleResize)
    }
  })

  return isMobile
}

export default useIsMobile
