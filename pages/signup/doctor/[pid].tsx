import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import AuthContainer from 'containersDoctors/AuthLayout'

const SignupForm = dynamic(() => import('containersDoctors/SignupForm'), {
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
