import Input from 'components/Input'
import BlankCardModal from 'components/BlankCardModal'
import Button from 'components/Button'
import React, { useState, useEffect } from 'react'
import styles from './style.module.css'
import { MenuItem, Select } from '@mui/material'
import { useGetNextOfKin } from 'network/ReactQuery/Queries/NextOfKin/useNextOfKin'
import { useAddNextOfKin } from 'network/ReactQuery/Mutations/NextOfKin/useNextOfKin'
import * as Yup from 'yup'
import { IAddNextOfKin } from 'interface/nextofkin'
import { useFormik } from 'formik'
import EmergencyCardKin from 'containers/EmergencyCardKin'
import { EMERGENGENCY_RELATIONSHIP_ENUM } from 'constants/constants'

const EmergencyContact = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [defaultMethod, setDefaultMethod] = useState('')
  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }

  const { nextOfKin, refetchNextOfKin } = useGetNextOfKin()

  const {
    nextOfKinMutation,
    nextOfKinLoading,
    nextOfKinSuccess,
    nextOfKinError,
  } = useAddNextOfKin()

  const validationSchema = Yup.object({
    firstName: Yup.string().required('FirstName cannot be empty'),
    lastName: Yup.string().required('LastName cannot be empty'),
    phoneNumber: Yup.string().required('PhoneNumber cannot be empty'),
    email: Yup.string()
      .email('Must be valid email')
      .required('Must be valid email'),
  })

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    onSubmit: async (values: IAddNextOfKin, { resetForm }) => {
      const newCredentials = {
        ...values,
        relationship: defaultMethod,
      }
      await nextOfKinMutation.mutateAsync(newCredentials)
      refetchNextOfKin()
    },
  })

  useEffect(() => {
    if (nextOfKinSuccess) {
      handleClose()
    }
  }, [nextOfKinSuccess])

  return (
    <>

      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'680px'}
      >
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>
          <div className={styles.topText}>
            Please fill the form to add your emergency contact
          </div>
          <Input
            type="email"
            styleName={styles.input}
            placeholder="Enter email"
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
          <br />
          <Input
            type="text"
            styleName={styles.input}
            placeholder="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.firstName && formik.touched.firstName
                ? formik.errors.firstName
                : null
            }
          />
          <br />
          <Input
            type="text"
            styleName={styles.input}
            placeholder="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.lastName && formik.touched.lastName
                ? formik.errors.lastName
                : null
            }
          />
          <br />
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>Relationship</div>
            <Select
              value={defaultMethod}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              displayEmpty
              renderValue={
                defaultMethod !== ''
                  ? undefined
                  : () => <span className={styles.placeholder}>Select one</span>
              }
              style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
            >
              {EMERGENGENCY_RELATIONSHIP_ENUM?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>

          <br />
          <Input
            type="text"
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
          <Button
            type="submit"
            hg="50px"
            color="primary"
            className={styles.presBtn}
            isLoading={nextOfKinLoading}
            disabled={nextOfKinLoading}
          >
            Save
          </Button>
        </form>
      </BlankCardModal>
      <div className={styles.formContainer}>
        <div className={styles.formContainerForm}>
          <div className={styles.header} onClick={handleOpen}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.75 1.125C9.75 0.826631 9.63147 0.540483 9.42049 0.329505C9.20952 0.118526 8.92337 0 8.625 0C8.32663 0 8.04048 0.118526 7.8295 0.329505C7.61853 0.540483 7.5 0.826631 7.5 1.125V7.5H1.125C0.826631 7.5 0.540483 7.61853 0.329505 7.8295C0.118526 8.04048 0 8.32663 0 8.625C0 8.92337 0.118526 9.20952 0.329505 9.42049C0.540483 9.63147 0.826631 9.75 1.125 9.75H7.5V16.125C7.5 16.4234 7.61853 16.7095 7.8295 16.9205C8.04048 17.1315 8.32663 17.25 8.625 17.25C8.92337 17.25 9.20952 17.1315 9.42049 16.9205C9.63147 16.7095 9.75 16.4234 9.75 16.125V9.75H16.125C16.4234 9.75 16.7095 9.63147 16.9205 9.42049C17.1315 9.20952 17.25 8.92337 17.25 8.625C17.25 8.32663 17.1315 8.04048 16.9205 7.8295C16.7095 7.61853 16.4234 7.5 16.125 7.5H9.75V1.125Z"
                fill="black"
              />
            </svg>
            Add new
          </div>

          {nextOfKin?.contacts?.map((contact) => (
            <EmergencyCardKin
              key={contact.id}
              name={`${contact.firstName} ${contact.lastName}`}
              userId={contact?.id}
              nextOfKin={true}
              removeBtn={false}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EmergencyContact
