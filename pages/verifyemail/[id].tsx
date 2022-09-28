import Head from 'next/head'
import dynamic from 'next/dynamic'
import AuthContainer from 'containers/AuthLayout'

const VerifyEmailForm = dynamic(() => import('containers/VerifyEmailForm'), {
  ssr: false,
})
const login = () => {
  return (
    <>
      <Head>
        <title>VerifyMail -- Betacare</title>
      </Head>
      <AuthContainer bgSize="big" image="/images/login-2.svg">
        <VerifyEmailForm />
      </AuthContainer>
    </>
  )
}

export default login
