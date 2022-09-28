import AuthContainer from 'containers/AuthLayout'
import React, { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { patient_routes } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { USER_TOKEN } from 'network/config/queryKeys'

const SignupForm = dynamic(() => import('containers/SignupForm'), {
  ssr: false,
})
const Signup: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    try {
      const tokenVisible = getWithExpiry(USER_TOKEN)

      if (tokenVisible) {
        router.push(patient_routes.PATIENTS_HOME)
      }
    } catch (err) {}
  }, [router])

  return (
    <>
      <Head>
        <title>Signup -- Valueplus</title>
      </Head>

      <AuthContainer bgSize="small" image="/images/sign-up.svg">
        <SignupForm />
      </AuthContainer>
    </>
  )
}

export default Signup
