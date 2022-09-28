import Head from 'next/head'
import dynamic from 'next/dynamic'
import AuthContainer from 'containers/AuthLayout'
import { patient_routes } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useEffect } from 'react'

const NewPasswordForm = dynamic(() => import('containers/NewPasswordForm'), {
  ssr: false,
})
const Login = () => {
  return (
    <>
      <Head>
        <title>Reset Password -- Betacare</title>
      </Head>
      <AuthContainer bgSize="big" image="/images/login-2.svg">
        <NewPasswordForm />
      </AuthContainer>
    </>
  )
}

export default Login
