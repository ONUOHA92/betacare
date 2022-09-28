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
// import { triggerResetNewDoctorPassword, destroy } from 'actions/auth'
import { Auth } from 'types/authTypes'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { routes_doctor } from 'utils/routes'
import {
  setWithOutExpiry,
  getWithOutExpiry,
  getWithExpiry,
} from 'utils/localStorage'
import Popups from 'componentsDoctors/Popup'
import { USER_TOKEN } from 'network/config/queryKeys'

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, 'Password cannot be less than 8 characters')
    .required('Password cannot be empty')
    .matches(/[a-z]/, 'Password must have lowercase')
    .matches(/[A-Z]/, 'Password must have at least one uppercase')
    .matches(/\d/, 'Password must have numbers')
    .matches(/[a-z]/, 'Password must have lowercase')
    .required('Password cannot be empty'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must and should match'),
})

const NewPasswordForm = () => {
  const [visible, setVisible] = useState(false)

  const togglePassword = () => {
    setVisible(!visible)
  }

  // const { resetPassword } = useSelect('auth')

  const formik = useFormik({
    validationSchema,
    initialValues: {
      otp: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (
      values: Auth.PasswordResetReq,
      actions: FormikHelpers<Auth.PasswordResetReq>
    ) => {
      const credentials: Auth.PasswordResetReq = {
        otp: getWithOutExpiry('otp_step1')?.otp || '',
        email: getWithOutExpiry('otp_step1')?.email || '',
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }
      // dispatch(triggerResetNewDoctorPassword.request(credentials))
    },
  })

  const router = useRouter()

  useEffect(() => {
    const tokenVisible = getWithExpiry(USER_TOKEN)
    if (tokenVisible) {
      router.push(routes_doctor.DOCTORS_HOME)
    }
  }, [router])

  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {/* {resetPassword.success && (
        <Popups
          isOpen={open}
          current="requestPasswordSuccess"
          handleClose={handleClose}
          sensitivePassword={formik?.values?.newPassword}
        />
      )} */}
      <Stack sx={{ width: '100%' }} spacing={2}>
        {/* {resetPassword.error && (
          <Alert severity="error">
            {resetPassword?.error?.response?.data?.message || 'Invalid details'}
          </Alert>
        )}
        {resetPassword.success && (
          <Alert severity="success">Successfully changed password</Alert>
        )} */}
      </Stack>
      <h2 className={styles.heading}>
        Great, now you can <span>Create New Password </span>
      </h2>
      <small className={styles.smallText}>
        Please enter a new password and update.
      </small>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.form}>
          <Input
            type={visible ? 'text' : 'password'}
            styleName={styles.input}
            placeholder="Enter New Password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.newPassword && formik.touched.newPassword
                ? formik.errors.newPassword
                : null
            }
            adornment={eye}
            adornmentAlt="eye"
            onAdornmentClick={togglePassword}
          />
          <Input
            type={visible ? 'text' : 'password'}
            styleName={styles.input}
            placeholder="Confirm New Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
            adornment={eye}
            adornmentAlt="eye"
            onAdornmentClick={togglePassword}
          />
          <div className={styles.positionBtn}>
            <Button
              // isLoading={resetPassword?.isLoading}
              disabled={false}
              type="submit"
              color="primary"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.form}></div>
    </>
  )
}

export default NewPasswordForm
