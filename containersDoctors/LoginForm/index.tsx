import Button from 'componentsDoctors/Button'
import Input from 'componentsDoctors/Input'
import React, { useState, useEffect } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import AlertBox from 'componentsDoctors/AlertBox'
import Link from 'next/link'
import eye from 'public/images/eye-icon.png'
import mail from 'public/images/icons/email.svg'
import lock from 'public/images/icons/lock.svg'
import { useRouter } from 'next/router'
import { Auth } from 'types/authTypes'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { routes_doctor } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { USER_TOKEN } from 'network/config/queryKeys'
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
  const [allowDisplay, setAllowDisplay] = useState(false)

  useEffect(() => {
    setAllowDisplay(false)
  }, [])

  const [visible, setVisible] = useState(false)

  const togglePassword = () => {
    setVisible(!visible)
  }

  // const { login, isLoading } = useSelect('auth')

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
      setAllowDisplay(true)
      const credentials: Auth.LoginDetails = {
        email: values.email?.toLowerCase(),
        password: values.password,
      }
      // dispatch(authenticateUser.request(credentials))
    },
  })

  const router = useRouter()

  // useEffect(() => {
  //   const tokenVisible = getWithExpiry(USER_TOKEN)
  //   if (login?.success) {
  //     if (tokenVisible) {
  //       router.push(routes_doctor.DOCTORS_HOME)
  //     }
  //   }
  //   if (tokenVisible) {
  //     router.push(routes_doctor.DOCTORS_HOME)
  //   }
  // }, [login?.success, router])

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {/* {allowDisplay && login.error && (
          <Alert severity="error">
            {login?.error?.response?.data?.message || 'Something went wrong'}
          </Alert>
        )}
        {allowDisplay && login.success && (
          <Alert severity="success">
            You have successfully loggedIn. Redirecting...
          </Alert>
        )} */}
      </Stack>
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
            // isLoading={isLoading}
            disabled={false}
            type="submit"
            color="primary"
          >
            Sign in
          </Button>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p>OR</p>
          </div>
          <Button type="button" color="neutral">
            <Image src={GOOGLE_SVG} alt="google" width="24" height="24" />
            Sign in with Google
          </Button>

          <p className={styles.link}>
            Dont have an account?{' '}
            <Link href="/signup" passHref scroll={false}>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
      <div className={styles.form}></div>
    </>
  )
}

export default LoginForm
