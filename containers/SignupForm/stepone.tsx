import Button from 'components/Button'
import Input from 'components/Input'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import doctorSignupStyle from 'containersDoctors/SignupForm/style.module.css'
import Link from 'next/link'
import eye from 'public/images/eye-icon.png'
import mail from 'public/images/icons/email.svg'
import user from 'public/images/icons/user.svg'
import phone from 'public/images/icons/phone.svg'
import lock from 'public/images/icons/lock.svg'
import { Auth } from 'types/authTypes'
import MuiPhoneNumber from 'material-ui-phone-number'
import { DEFAULT_COUNTRY_CODE } from 'constants/index'
import { handlePhoneOnChange } from 'utils/handlePhoneNumberChange'

const validationSchema = Yup.object({
  firstName: Yup.string().required('Field cannot be empty'),
  lastName: Yup.string().required('Field cannot be empty'),
  email: Yup.string()
    .email('Must be valid email')
    .required('Must be valid email'),
  password: Yup.string()
    .min(8, 'Password cannot be less than 8 characters')
    .matches(/[a-z]/, 'Password must have lowercase')
    .matches(/[A-Z]/, 'Password must have at least one uppercase')
    .matches(/\d/, 'Password must have numbers')
    .matches(/[a-z]/, 'Password must have lowercase')
    .matches(/[@$!%*#?&]+/, 'Password must have at least one special character')
    .required('Password cannot be empty'),
})

const StepOne = ({ next, data, handleSignup, handleFailure }) => {
  const [visible, setVisible] = useState(false)
  const [generatedPhoneNumber, setGeneratedPhoneNumber] = useState('')
  const togglePassword = () => {
    setVisible(!visible)
  }
  const formik = useFormik({
    validationSchema,
    initialValues: {
      password: data.password,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
    },
    onSubmit: (values: Auth.SignupCredentials) => {
      const newValues = {
        ...values,
        phoneNumber: generatedPhoneNumber,
      }
      next(newValues)
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.form}>
          <Input
            type="text"
            styleName={styles.input}
            placeholder="First Name"
            name="firstName"
            icon={user}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.firstName && formik.touched.firstName
                ? formik.errors.firstName
                : null
            }
          />
          <Input
            type="text"
            styleName={styles.input}
            placeholder="Last Name"
            name="lastName"
            icon={user}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.lastName && formik.touched.lastName
                ? formik.errors.lastName
                : null
            }
          />
          <Input
            type="email"
            styleName={styles.input}
            placeholder="Enter email"
            name="email"
            icon={mail}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
          />
          <div className={doctorSignupStyle.phoneContainer}>
            <MuiPhoneNumber
              defaultCountry={DEFAULT_COUNTRY_CODE}
              // @ts-ignore
              onChange={(value: string | number) =>
                handlePhoneOnChange(value, setGeneratedPhoneNumber)
              }
              className={doctorSignupStyle.phoneField}
            />
          </div>

          <br />

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
          <label className={styles.terms}>
            <input type="checkbox" required /> {''}I agree to all{' '}
            <Link href="/" passHref scroll={false}>
              Privacy Policy
            </Link>
            ,{' '}
            <Link href="/" passHref scroll={false}>
              Terms and Conditions
            </Link>
          </label>

          <Button disabled={false} type="submit" color="primary">
            Continue
          </Button>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p>OR</p>
          </div>
          {/* <Button type="button" color="neutral">
            <img src={GOOGLE_SVG}alt="google" />
            Sign up with Google
          </Button> */}
          <p className={styles.link}>
            Already have an Account?{' '}
            <Link href="/login" passHref scroll={false}>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}

export default StepOne
