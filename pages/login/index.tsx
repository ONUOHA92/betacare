import Head from 'next/head'
import AuthContainer from 'containers/AuthLayout'

import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import('containers/LoginForm'), {
  ssr: false,
})

const Login = () => {
  return (
    <>
      <Head>
        <title>Login -- Betacare</title>
      </Head>
      <AuthContainer bgSize="big" image="/images/login-2.svg">
        <LoginForm />
      </AuthContainer>
    </>
  )
}

export default Login
