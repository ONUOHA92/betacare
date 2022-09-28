import Input from 'components/Input'
import React, { useState, useEffect } from 'react'
import styles from './style.module.css'
import Button from 'components/Button'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Patients } from 'types/patientsTypes'
import { useUpdatePassword } from 'network/ReactQuery/Mutations/Auth/useUpdatePassword'


const Info = () => {
  const { updatePasswordMutation, isUpdatingPassword } = useUpdatePassword()

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(8, 'Password cannot be less than 8 characters')
      .matches(/[a-z]/, 'Password must have lowercase')
      .matches(/[A-Z]/, 'Password must have at least one uppercase')
      .matches(/\d/, 'Password must have numbers')
      .matches(/[a-z]/, 'Password must have lowercase')
      .required('Password cannot be empty'),
    newPassword: Yup.string()
      .min(8, 'Password cannot be less than 8 characters')
      .matches(/[a-z]/, 'Password must have lowercase')
      .matches(/[A-Z]/, 'Password must have at least one uppercase')
      .matches(/\d/, 'Password must have numbers')
      .matches(/[a-z]/, 'Password must have lowercase')
      .required('Password cannot be empty'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    ),
  })

  const formik = useFormik({
    validationSchema,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (values: Patients.UpdatePassword) => {
      updatePasswordMutation
        .mutateAsync(values)
        .then((result) => console.log(result))
        .catch((error) => console.log(error?.response))
    },
  })

  return (
    <>

      <div className={styles.formContainer}>
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>
          <Input
            label="Old password"
            placeholder="Enter old password"
            type="password"
            required
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.oldPassword && formik.touched.oldPassword
                ? formik.errors.oldPassword
                : null
            }
          />
          <br />
          <Input
            label="New password"
            placeholder="Enter new password"
            type="password"
            required
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.newPassword && formik.touched.newPassword
                ? formik.errors.newPassword
                : null
            }
          />
          <br />
          <Input
            label="Confirm password"
            placeholder="Confirm password"
            type="password"
            required
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
          />
          <Button
            type="submit"
            hg="50px"
            color="secondary"
            disabled={isUpdatingPassword}
            isLoading={isUpdatingPassword}
            className={styles.presBtn}
          >
            Edit password
          </Button>
        </form>
      </div>
    </>
  )
}

export default Info
