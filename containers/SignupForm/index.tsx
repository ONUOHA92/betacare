/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import styles from './style.module.css'
import StepOne from './stepone'
import StepTwo from './steptwo'
import { Auth } from 'types/authTypes'
import Stack from '@mui/material/Stack'
import Popups from 'components/Popup'
import { OPTIONS } from 'constants/index'
import { useSignUp } from 'network/ReactQuery/Mutations/Auth/useSignUp'

const formatDate = (d) => {
  return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
  ].join('-')
}

const SignupForm = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  const [data, setData] = useState<Auth.SignupCredentials>({
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: OPTIONS[0],
    dateOfBirth: `${formatDate(new Date())}`,
  })

  const handleNextSteps = (newData: Auth.SignupCredentials) => {
    setData((prev) => ({ ...prev, ...newData }))
    setPageIndex((prev) => prev + 1)
  }

  const handlePrevSteps = (newData: Auth.SignupCredentials) => {
    setData((prev) => ({ ...prev, ...newData }))
    setPageIndex((prev) => prev - 1)
  }

  const handleFailure = (result: any) => {
    console.log('error', result)
  }

  const { signUp } = useSignUp()

  const handleSignup = async (googleData: {
    profileObj: { email: any; googleId: any }
  }) => {
    const { email, googleId } = googleData?.profileObj

    signUp({
      email,
      password: googleId,
      lastName: '',
      firstName: '',
      phoneNumber: '',
      platform: '',
      gender: '',
      dateOfBirth: '',
    })
  }
  const steps = [
    <StepOne
      next={handleNextSteps}
      data={data}
      handleFailure={handleFailure}
      handleSignup={handleSignup}
    />,
    <StepTwo
      prev={handlePrevSteps}
      data={data}
      setSuccess={setSuccess}
      setError={setError}
    />,
  ]

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {success && (
          <Popups
            handleClose={() => setSuccess(false)}
            isOpen={success}
            current="verifyEmail"
          />
        )}
      </Stack>

      <div>
        <h2 className={styles.heading}>
          Sign Up <span>To Create an Account</span>
        </h2>
        <p>
          Step <span>{pageIndex + 1}</span> of <span>{steps.length}</span>
        </p>
      </div>
      {steps[pageIndex]}
    </>
  )
}

export default SignupForm
