import Head from 'next/head'
import AuthContainer from 'containers/AuthLayout'
import ForgotPasswordForm from 'containers/ForgotPasswordForm'
import { patient_routes } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useEffect } from 'react'

const Login = () => {
  return (
    <>
      <Head>
        <title>Forgot Password -- Betacare</title>
      </Head>
      <AuthContainer bgSize="big" image="/images/login-2.svg">
        <ForgotPasswordForm />
      </AuthContainer>
    </>
  )
}

export default Login
