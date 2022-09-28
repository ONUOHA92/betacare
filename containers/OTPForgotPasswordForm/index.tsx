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
import OtpInput from 'react-otp-input'
import { ContentCutOutlined } from '@mui/icons-material'
import useCountDown from 'react-countdown-hook'
import { setWithOutExpiry, getWithOutExpiry } from 'utils/localStorage'
import { USER_TOKEN } from 'network/config/queryKeys'

const initialTime = 60 * 1000 // initial time in milliseconds, defaults to 60000
const interval = 1000 // interval to change remaining time amount, defaults to 1000

const validationSchema = Yup.object({
  otp: Yup.string().min(4, 'OTP must be 4').required('Must be valid email'),
  email: Yup.string()
    .email('Must be valid email')
    .required('Must be valid email'),
})

const OTPForm = () => {
  //states
  const [visible, setVisible] = useState(false)
  const [otp, setOtp] = useState('')
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  )

  //router
  const router = useRouter()

 

  //actions
  const togglePassword = () => {
    setVisible(!visible)
  }

  const resetTimer = () => {
    restart()
    const credentials = {
      email: router?.query?.email && router?.query?.email,
    }
  }

  const restart = React.useCallback(() => {
    const newTime = 60 * 1000
    start(newTime)
  }, [])

  const formik = useFormik({
    validationSchema,
    initialValues: {
      otp: '',
      email: '',
    },
    onSubmit: (
      values: Auth.PasswordResetReq,
      actions: FormikHelpers<Auth.PasswordResetReq>
    ) => {
      const credentials: Auth.PasswordResetReq = {
        otp: otp,
        email: router?.query?.email,
      }
      setWithOutExpiry('otp', credentials)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentials: Auth.PasswordResetReq = {
      otp: otp,
      email: router?.query?.email,
    }

    if (credentials?.otp?.length === 4 && credentials?.email) {
      setWithOutExpiry('otp_step1', credentials)
      router.push(patient_routes.NEWPASSWORD)
    }
  }

  // effects


  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    const tokenVisible = getWithExpiry(USER_TOKEN)
    if (tokenVisible) {
      router.push(patient_routes.PATIENTS_HOME)
    }
  }, [router])

  const handleChange = (otp) => setOtp(otp)

  //variables
  const extractEmail = router?.query?.email || ''
  const emailArr = (extractEmail as string).split('@')
  const grapSuffix = emailArr && emailArr[emailArr.length - 1]
  const formattedTime = Number((timeLeft / 1000).toFixed(0))

  return (
    <>
      <h2 className={styles.heading}>
        Let&apos;s get this <span>OTP Verifcation </span>
      </h2>
      <small className={styles.smallText}>
        Please enter the OTP sent to ********@{grapSuffix}
      </small>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.form}>
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={4}
            separator={<span> </span>}
            inputStyle={styles.otpFormInput}
            containerStyle={styles.otpFormConatiner}
          />
          <small className={styles.smallText}>
            {formattedTime === 0 ? (
              <span className={styles.resendBtn} onClick={() => resetTimer()}>
                Resend
              </span>
            ) : (
              <span>Resend Code: {formattedTime}s</span>
            )}
          </small>
          <div className={styles.positionBtn} onClick={(e) => handleSubmit(e)}>
            <Button
              // isLoading={resetPassword?.isLoading}
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

export default OTPForm
