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
import { routes_doctor, patient_routes, admin_routes } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { useLogin } from 'network/ReactQuery/Mutations/Auth/useLogin'
import { USER_TOKEN } from 'network/config/queryKeys'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { useRecoilValue } from 'recoil'
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
  const { roles, id } = useRecoilValue(userAtom)
  const { login, isLoggingIn, isSuccess, loginError } = useLogin()

  const [visible, setVisible] = useState(false)

  const togglePassword = () => {
    setVisible(!visible)
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
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
          } else if (
            roles[0] !== 'ROLE_PATIENT' &&
            roles[0] !== 'ROLE_DOCTOR'
          ) {
            router.push(admin_routes.HOME)
          }
        }
      }
    }, 1000)
  }, [isSuccess, router, roles, id])

  const handleFailure = (err: any) => { }

  const handleLogin = async (googleData) => {
    const { email, googleId } = googleData?.profileObj

    login({ email, password: googleId })
  }

  return (
    <>
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
