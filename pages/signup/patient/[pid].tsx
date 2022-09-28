import Head from 'next/head'
import { useRouter } from 'next/router'
import AuthContainer from 'containers/AuthLayout'
import dynamic from 'next/dynamic'

const SignupForm = dynamic(() => import('containers/SignupForm'), {
  ssr: false,
})
const Signup = () => {
  const router = useRouter()
  const { pid } = router.query
  return (
    <>
      <Head>
        <title>Signup -- Valueplus</title>
      </Head>

      <AuthContainer bgSize="small" image="/images/sign-up.svg">
        {typeof pid === 'string' && <SignupForm />}
      </AuthContainer>
    </>
  )
}

export default Signup
