import AuthContainer from 'containersDoctors/AuthLayout'
import React, { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { routes_doctor } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import GoogleLogin from 'react-google-login'
import { USER_TOKEN } from 'network/config/queryKeys'

const SignupForm = dynamic(() => import('containersDoctors/SignupForm'), {
  ssr: false,
})
const Signup: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    try {
      const tokenVisible = getWithExpiry(USER_TOKEN)
      if (tokenVisible) {
        router.push(routes_doctor.DOCTORS_HOME)
      }
    } catch (err) {}
  }, [router])

  return (
    <>
      <Head>
        <title>Signup -- Valueplus</title>
      </Head>

      <AuthContainer bgSize="small" image="/images/sign_up2.svg">
        <SignupForm />
      </AuthContainer>
    </>
  )
}

export default Signup
