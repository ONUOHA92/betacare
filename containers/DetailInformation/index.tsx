import Input from 'components/Input'
import React, { useState } from 'react'
import styles from './style.module.css'
import Button from 'components/Button'
import { useUpdateUserProfile } from 'network/ReactQuery/Mutations/Profile/useUpdateUserProfile'
import { useProfile } from 'network/ReactQuery/Queries/Profile/useProfile'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IProfileUpdate } from 'interface/profile'

const DetailInformation = () => {
  const { userProfile } = useProfile()
  const { userProfileMutation, profileUpdateLoading } = useUpdateUserProfile()

  const validationSchema = Yup.object({
    healthInsuranceCompany: Yup.string().required(
      'Health Insurance Company cannot be empty'
    ),
    healthInsuranceNumber: Yup.string().required(
      'Health Insurance Number cannot be empty'
    ),
  })
  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      healthInsuranceCompany: userProfile?.healthInsuranceCompany || '',
      healthInsuranceNumber: userProfile?.healthInsuranceNumber || '',
    },
    onSubmit: async (values: IProfileUpdate) => {
      const newCredentials = {
        healthInsuranceCompany: values.healthInsuranceCompany,
        healthInsuranceNumber: values.healthInsuranceNumber,
      }
      await userProfileMutation.mutateAsync(newCredentials)
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
            label="Health insurance company"
            type="text"
            height="85px"
            styleName={styles.input}
            name="healthInsuranceCompany"
            placeholder="Company ABC"
            required
            value={formik.values.healthInsuranceCompany}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.healthInsuranceCompany &&
                formik.touched.healthInsuranceCompany
                ? formik.errors.healthInsuranceCompany
                : null
            }
          />
          <br />
          <Input
            label="Health insurance number"
            type="number"
            placeholder="1234567890"
            height="85px"
            styleName={styles.input}
            name="healthInsuranceNumber"
            required
            value={formik.values.healthInsuranceNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.healthInsuranceNumber &&
                formik.touched.healthInsuranceNumber
                ? formik.errors.healthInsuranceNumber
                : null
            }
          />
          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn}
            isLoading={profileUpdateLoading}
          >
            Edit profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default DetailInformation
