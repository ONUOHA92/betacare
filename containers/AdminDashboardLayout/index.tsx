import React, { useEffect } from 'react'
import styles from './style.module.css'
import { motion } from 'framer-motion'

import { admin_routes } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { useRouter } from 'next/router'
import { USER_TOKEN } from 'network/config/queryKeys'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { useRecoilValue } from 'recoil'
import { profilePictureAtom } from 'recoilStore/Atoms/profilePictureAtom'
import { getDoctorsSearchAtom } from 'recoilStore/Atoms/doctorSearchAtom'
import dynamic from 'next/dynamic'

import AdminTopBar from 'containers/AdminTopBar'
export const TopBarContext = React.createContext(null)

const AdminSideBar = dynamic(() => import('containers/AdminSideBar'), {
  ssr: false,
})
const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const MainLayout = ({ children }: React.PropsWithChildren<React.ReactNode>) => {
  const router = useRouter()
  useEffect(() => {
    try {
      const tokenVisible = getWithExpiry(USER_TOKEN)
      if (!tokenVisible) {
        router.push(admin_routes.LOGIN)
      }
    } catch (err) {
      return
    }
  }, [])
  const searchValue = useRecoilValue(getDoctorsSearchAtom)

  return (
    <>
      <div className={styles.wrapper}>
        <AdminSideBar />
        <main className={styles.main}>
          <TopBarContext.Provider value={searchValue}>
            <AdminTopBar />
            <motion.div
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ type: 'linear' }}
            >
              <section className={styles.section}>{children}</section>
            </motion.div>
          </TopBarContext.Provider>
        </main>
      </div>
    </>
  )
}

function DashboardLayout({
  children,
}: React.PropsWithChildren<React.ReactNode>) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <MainLayout>{children}</MainLayout>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default DashboardLayout
