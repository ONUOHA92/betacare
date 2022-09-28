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
import { useLogin } from 'network/ReactQuery/Mutations/Auth/useLogin'
import { USER_TOKEN } from 'network/config/queryKeys'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { useRecoilValue } from 'recoil'
import { padding } from '@mui/system'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be valid email')
    .required('Must be valid email'),
  password: Yup.string()
    .min(8, 'Password cannot be less than 8 characters')
    .required('Password cannot be empty'),
})

const DoctorsForm = () => {
  const { roles } = useRecoilValue(userAtom)
  const { login, isLoggingIn, isSuccess, loginError } = useLogin()

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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.form}>
          <Input
            type="text"
            styleName={styles.input}
            placeholder="Full name"
            name="Full name"
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
            placeholder="Email  address"
            name="Email  address"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null
            }
            onAdornmentClick={togglePassword}
          />

          <TextareaAutosize
            aria-label="minimum height"
            className={styles.textArea}
            minRows={4}
            cols={10}
            placeholder="Enter message"
          />

          <div className={styles.button}>
            <Button
              isLoading={isLoggingIn}
              disabled={false}
              type="submit"
              color="primary"
            >
              Send
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.form}></div>
    </>
  )
}

export default DoctorsForm
