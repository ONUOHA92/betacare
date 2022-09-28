import Input from 'components/Input'
import React, { useState } from 'react'
import styles from './style.module.css'
import Button from 'components/Button'
import { useUpdateUserProfile } from 'network/ReactQuery/Mutations/Profile/useUpdateUserProfile'
import { useProfile } from 'network/ReactQuery/Queries/Profile/useProfile'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IProfileUpdate } from 'interface/profile'

const ContactInformation = () => {
  const { userProfile } = useProfile()
  const { userProfileMutation, profileUpdateLoading } = useUpdateUserProfile()

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const [male, setMale] = useState(false)
  const [female, setFemale] = useState(true)

  const triggerActiveness = (type) => {
    if (type === 'male') {
      setFemale(false)
      setMale(true)
    }

    if (type === 'female') {
      setFemale(true)
      setMale(false)
    }
  }

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required('PhoneNumber cannot be empty'),
    address: Yup.string().required('Address cannot be empty'),
  })

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      phoneNumber: userProfile?.phoneNumber,
      address: userProfile?.address || '',
    },
    onSubmit: async (values: IProfileUpdate) => {
      const newCredentials = {
        phoneNumber: values.phoneNumber,
        address: values.address,
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
            type="email"
            label="Email"
            value={userProfile?.email}
            disabled
            className={styles.disabled}
          />
          <br />
          <Input
            label="Phone number"
            type="number"
            required
            styleName={styles.input}
            placeholder="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.phoneNumber && formik.touched.phoneNumber
                ? formik.errors.phoneNumber
                : null
            }
          />
          <br />
          <Input
            type="text"
            placeholder="No. 15, lafik avenue"
            height="85px"
            label="Address"
            styleName={styles.input}
            name="address"
            required
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.address && formik.touched.address
                ? formik.errors.address
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

export default ContactInformation
