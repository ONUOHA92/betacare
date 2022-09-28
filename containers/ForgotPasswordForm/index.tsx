import Button from 'components/Button'
import Input from 'components/Input'
import React, { useState, useEffect } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import AlertBox from 'components/AlertBox'
import Link from 'next/link'
import eye from 'public/images/eye-icon.png'
import mail from 'public/images/icons/email.svg'
import lock from 'public/images/icons/lock.svg'
import { useRouter } from 'next/router'
import { Auth } from 'types/authTypes'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { patient_routes } from 'utils/routes'
import { getWithExpiry } from 'utils/localStorage'
import { USER_TOKEN } from 'network/config/queryKeys'
import { useForgotPassword } from 'network/ReactQuery/Mutations/Auth/useForgotPassword'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be valid email')
    .required('Must be valid email'),
})

const ForgotPasswordForm = () => {
  const [visible, setVisible] = useState(false)

  const togglePassword = () => {
    setVisible(!visible)
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
    },
    onSubmit: (
      values: Auth.SingleEmail,
      actions: FormikHelpers<Auth.SingleEmail>
    ) => {
      const credentials: Auth.SingleEmail = {
        email: values.email?.toLowerCase(),
      }

      resetPassword(credentials)
    },
  })

  const { resetPassword, Error, setError, isLoading } = useForgotPassword(
    formik?.values.email
  )

  // useEffect(() => {
  //   const tokenVisible = getWithExpiry(USER_TOKEN)
  //   if (tokenVisible) {
  //     router.push(patient_routes.PATIENTS_HOME)
  //   }
  // }, [router])

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 2000)
  }, [Error])

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {Error && <Alert severity="error">{Error}</Alert>}
      </Stack>
      <h2 className={styles.heading}>
        Opps, looks like you <span>Forgot Password </span>
      </h2>
      <small className={styles.smallText}>
        Please enter the email associated wiith your account
      </small>
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
          <div className={styles.positionBtn}>
            <Button
              isLoading={isLoading}
              disabled={false}
              type="submit"
              color="primary"
            >
              Next
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.form}></div>
    </>
  )
}

export default ForgotPasswordForm
