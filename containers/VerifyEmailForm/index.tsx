/* eslint-disable @next/next/no-img-element */
import Button from 'components/Button'
import Input from 'components/Input'
import React, { useState, useEffect } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import Link from 'next/link'
import eye from 'public/images/eye-icon.png'
import mail from 'public/images/icons/email.svg'
import lock from 'public/images/icons/lock.svg'
import { useRouter } from 'next/router'
import { Auth } from 'types/authTypes'
import { routes_doctor, patient_routes } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import GoogleLogin from 'react-google-login'
import { useLogin } from 'network/ReactQuery/Mutations/Auth/useLogin'
import { USER_TOKEN } from 'network/config/queryKeys'
import { useVerifyEmail } from 'network/ReactQuery/Mutations/Auth/useVerifyEmail'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { useRecoilValue } from 'recoil'
import Popups from 'components/Popup'
import { GOOGLE_SVG } from 'assets/image'
import Image from 'next/image'
import { ROUTES } from 'navigation/routes'


const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be valid email')
    .required('Must be valid email'),
  password: Yup.string()
    .min(8, 'Password cannot be less than 8 characters')
    .required('Password cannot be empty'),
})

const LoginForm = () => {
  const { roles } = useRecoilValue(userAtom)
  const { login, isLoggingIn, isSuccess, loginError } = useLogin()
  const { verifyMailMutateAsync, verifyMailSuccess } = useVerifyEmail()
  const [visible, setVisible] = useState(false)

  const togglePassword = () => {
    setVisible(!visible)
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: (
      values: Auth.LoginDetails,
      actions: FormikHelpers<Auth.LoginDetails>
    ) => {
      const credentials: Auth.LoginDetails = {
        email: values.email?.toLowerCase(),
        password: values.password,
      }
      login(credentials)
    },
  })

  const router = useRouter()

  useEffect(() => {
    const tokenVisible = getWithExpiry(USER_TOKEN)
    setTimeout(() => {
      if (isSuccess) {
        if (tokenVisible) {
          if (roles[0] === 'ROLE_PATIENT') {
            router.push(patient_routes.PATIENTS_HOME)
          } else if (roles[0] === 'ROLE_DOCTOR') {
            router.push(routes_doctor.DOCTORS_HOME)
          }
        }
      }
    }, 1000)
  }, [isSuccess, router, roles])

  const handleFailure = (result) => {
    console.log('error', result)
  }

  const handleLogin = async (googleData) => {
    const { email, googleId } = googleData?.profileObj

    login({ email, password: googleId })
  }

  useEffect(() => {
    const token = router?.query?.id
    if (token) {
      const credentials: Auth.VerifyEmail = {
        verificationToken: `${token}`,
      }
      verifyMailMutateAsync(credentials).catch((err) => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query?.id])

  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>

      {verifyMailSuccess && (
        <Popups
          isOpen={open}
          current="verifyEmailSuccess"
          handleClose={handleClose}
        />
      )}{' '}
      <h2 className={styles.heading}>
        Sign in <span>To Your Account</span>
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.form}>
          <Input
            type="text"
            styleName={styles.input}
            placeholder="Enter email"
            icon={mail}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
          />

          <Input
            type={visible ? 'text' : 'password'}
            styleName={styles.input}
            placeholder="Password"
            name="password"
            icon={lock}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null
            }
            adornment={eye}
            adornmentAlt="eye"
            onAdornmentClick={togglePassword}
          />
          <div className={styles.group}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link href={ROUTES.login}>Forgot Password?</Link>
          </div>

          <Button
            isLoading={isLoggingIn}
            disabled={false}
            type="submit"
            color="primary"
          >
            Sign in here
          </Button>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p>OR</p>
          </div>

          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                type="button"
                color="neutral"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <Image src={GOOGLE_SVG} alt="google" width="24" height="24" />
                Sign in with Google
              </Button>
            )}
            buttonText="Sign in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          />

          <p className={styles.link}>
            Dont have an account?
            <br />
            <Link href={ROUTES.signUp} passHref scroll={false}>
              Sign up as a doctor
            </Link>{' '}
            /{' '}
            <Link href={ROUTES.signUp} passHref scroll={false}>
              Sign up as a patient
            </Link>
          </p>
        </div>
      </form>
      <div className={styles.form}></div>
    </>
  )
}

export default LoginForm
