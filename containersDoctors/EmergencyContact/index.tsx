import Input from 'componentsDoctors/Input'
import BlankCardModal from 'componentsDoctors/BlankCardModal'
import Button from 'componentsDoctors/Button'
import EmergencyCard from 'containersDoctors/EmergencyCard'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { Alert, MenuItem, Select, Stack } from '@mui/material'
import { FormikHelpers, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useGetNextOfKin } from 'network/ReactQuery/Queries/NextOfKin/useNextOfKin'
import {
  useAddNextOfKin,
  useUpdateNextOfKin,
} from 'network/ReactQuery/Mutations/NextOfKin/useNextOfKin'
import { IAddNextOfKin } from 'interface/nextofkin'


const EmergencyContact = () => {
  const [open, setOpen] = React.useState(false)
  const [formState, setFormState] = React.useState({
    isEditing: false,
    data: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      relationship: 'Mother',
      phoneNumber: '',
    },
  })
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setFormState({
      isEditing: false,
      data: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        relationship: 'Mother',
        phoneNumber: '',
      },
    })
  }

  const availableRelationships = [
    { value: 'SISTER', label: 'Sister' },
    { value: 'BROTHER', label: 'Brother' },
    { value: 'FATHER', label: 'Father' },
    { value: 'MOTHER', label: 'Mother' },
    { value: 'SPOUSE', label: 'Spouse' },
    { value: 'OTHER', label: 'Other' },
  ]
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

  const {
    updateNextOfKinMutation,
    updateNextOfKinLoading,
    updateNextOfKinSuccess,
    updateNextOfKinError,
  } = useUpdateNextOfKin()

  const onSubmit = async (values: IAddNextOfKin) => {
    const credentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      relationship: values.relationship,
      phoneNumber: values.phoneNumber,
    }
    const updateCredentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      relationship: values.relationship,
      phoneNumber: values.phoneNumber,
      id: formState.data.id,
    }
    if (formState.isEditing) {
      await updateNextOfKinMutation.mutateAsync(updateCredentials)
    } else {
      await nextOfKinMutation.mutateAsync(credentials)
    }

    refetchNextOfKin()
  }
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    relationship: Yup.string().required('Relationship is required'),
    phoneNumber: Yup.string().required('Phonenumber is required'),
  })
  useEffect(() => {
    if (nextOfKinSuccess || updateNextOfKinSuccess) {
      handleClose()
    }
  }, [nextOfKinSuccess, updateNextOfKinSuccess])

  return (
    <>

      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'680px'}
      >
        <Formik
          initialValues={formState.data}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={styles.formContainerForm}>
            <div className={styles.formTopp}></div>
            <div className={styles.topText}>
              Please fill the form to add your next of kin
            </div>
            <Field name="firstName" id="firstName">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="First Name"
                    placeholder="Teko"
                    id="firstName"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Field name="lastName" id="lastName">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Last Name"
                    placeholder="Teejay"
                    id="lastName"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Field name="email" id="email">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Email"
                    placeholder="Teko@example.com"
                    id="email"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <div className={styles.relationship}>
              <Field name="relationship" id="relationship">
                {({ field, meta }: any) => (
                  <>
                    <div className={styles.relationshipInner}>Relationship</div>
                    <Select
                      id="relationship"
                      {...field}
                      inputProps={{ 'aria-label': 'Without label' }}
                      fullWidth
                      style={{
                        width: '100%',
                        borderRadius: '6px',
                        outline: 'none',
                      }}
                      placeholder="true"
                    >
                      {availableRelationships?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {meta.touched && meta.error && (
                      <div style={{ color: 'red' }}>{meta.error}</div>
                    )}
                  </>
                )}
              </Field>
            </div>

            <br />
            <Field name="phoneNumber" id="phoneNumber">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Phone number"
                    placeholder="+234 80123456789"
                    id="phoneNumber"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Button
              type="submit"
              hg="50px"
              color="primary"
              className={styles.presBtn}
              isLoading={nextOfKinLoading || updateNextOfKinLoading}
              disabled={nextOfKinLoading}
            >
              {formState.isEditing ? 'update' : 'add'}
            </Button>
          </Form>
        </Formik>
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
            <EmergencyCard
              active={true}
              key={contact.id}
              contact={contact}
              userId={contact?.id}
              handleOpen={handleOpen}
              setFormState={setFormState}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EmergencyContact
