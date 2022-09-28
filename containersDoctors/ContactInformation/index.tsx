import Input from 'componentsDoctors/Input'
import React, { useEffect } from 'react'
import { useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import Button from 'componentsDoctors/Button'
import { IUpdateDoctorProfile } from 'interface/doctor'
import { Alert, Stack } from '@mui/material'
import { useUpdateDoctorProfile } from 'network/ReactQuery/Mutations/Profile/useUpdateDoctorProfile'

type ProfileProps = {
  profile: any
  refetchDoctorProfile: () => void
}

const ContactInformation = ({
  profile,
  refetchDoctorProfile,
}: ProfileProps) => {
  const { updateDoctorProfile, isUpdatingDoctorProfile, isSuccess, isError } =
    useUpdateDoctorProfile()
  const doctorProfile = profile?.data
  console.log(doctorProfile)
  const formik = useFormik({
    initialValues: {
      phoneNumber: doctorProfile?.phoneNumber ?? '',
      address: doctorProfile?.address ?? '',
    },
    onSubmit: (values: IUpdateDoctorProfile) => {
      const credentials = {
        phoneNumber: values.phoneNumber,
        address: values.address,
      }
      updateDoctorProfile(credentials)

      setTimeout(() => {
        refetchDoctorProfile()
      }, 1000)
    },

    validationSchema: Yup.object({
      phoneNumber: Yup.string().required('Phone number cannot be empty'),
      address: Yup.string().required('Address cannot be empty'),
    }),
  })
  const { setFieldValue } = formik

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {isError && (
          <Alert severity="error">{isError || 'Something went wrong'}</Alert>
        )}
        {isSuccess && (
          <Alert severity="success">
            Contact information updated successfully.
          </Alert>
        )}
      </Stack>

      <div className={styles.formContainer}>
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>

          <Input
            id="phoneNumber"
            label="Phone number"
            placeholder="+238081432180"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            type="number"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <ErrorMessage name="phoneNumber">
              {(errorMessage) => (
                <div className={styles.error}>{errorMessage}</div>
              )}
            </ErrorMessage>
          )}

          <br />

          <Input
            value={formik.values.address}
            onChange={formik.handleChange}
            label="Address"
            placeholder="No. 15, lafik avenue"
            id="address"
          />
          {formik.errors.address && formik.touched.address && (
            <ErrorMessage name="address">
              {(errorMessage) => (
                <div className={styles.error}>{errorMessage}</div>
              )}
            </ErrorMessage>
          )}

          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn}
            isLoading={isUpdatingDoctorProfile}
          >
            Edit profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default ContactInformation
