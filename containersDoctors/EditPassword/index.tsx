import Input from 'components/Input'
import React, { useEffect, useState } from 'react'
import { FormikHelpers, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
// import { updateDoctorPassword, destroy } from 'actions/doctors'
import { Doctors } from 'types/doctorTypes'
import { useUpdatePassword } from 'network/ReactQuery/Mutations/Auth/useUpdatePassword'
import { UPDATE_PASSWORD_ATOM } from 'network/config/queryKeys'
import { updatePasswordAtom } from 'recoilStore/Atoms/updatePasswordAtom'
import { useRecoilValue } from 'recoil'
import styles from './style.module.css'
import Button from 'components/Button'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'

const Info = () => {
  const {
    updatePassword,
    isUpdatingPassword,
    isSuccessPassword,
    isErrorPassword,
  } = useUpdatePassword()
  const [open, setOpen] = useState(false)
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  const onSubmit = (
    values: Doctors.UpdatePasswordDetails,
    actions: FormikHelpers<Doctors.UpdatePasswordDetails>
  ) => {
    const credentials: Doctors.UpdatePasswordDetails = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    }
    updatePassword(credentials)
    console.log(credentials)
  }

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

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {isErrorPassword && (
          <Alert severity="error">
            {isErrorPassword || 'Something went wrong'}
          </Alert>
        )}
        {isSuccessPassword && (
          <Alert severity="success">
            Contact information updated successfully.
          </Alert>
        )}
      </Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className={styles.formContainer}>
          <Form className={styles.formContainerForm}>
            <div className={styles.formTopp}></div>
            <Field name="oldPassword" id="oldPassword">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Old password"
                    placeholder="Enter old password"
                    id="oldPassword"
                    type="password"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Field name="newPassword" id="newPassword">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="New password"
                    placeholder="Enter new password"
                    id="newPassword"
                    type="password"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Field name="confirmPassword" id="confirmPassword">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Confirm password"
                    placeholder="Enter new password"
                    id="confirmPassword"
                    type="password"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <Button
              type="submit"
              hg="50px"
              color="secondary"
              isLoading={isUpdatingPassword}
              disabled={false}
              className={styles.presBtn}
            >
              Edit password
            </Button>
          </Form>
        </div>
      </Formik>
    </>
  )
}

export default Info
