import Input from 'componentsDoctors/Input'
import React, { useState } from 'react'
import styles from './style.module.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Alert, Stack } from '@mui/material'
import Button from 'componentsDoctors/Button'
import { MenuItem, Select, TextField } from '@mui/material'
import { IUpdateDoctorProfile } from 'interface/doctor'
import { useUpdateDoctorProfile } from 'network/ReactQuery/Mutations/Profile/useUpdateDoctorProfile'

type ProfileProps = {
  profile: any
  refetchDoctorProfile: () => void
}

const PersonalInformation = ({
  profile,
  refetchDoctorProfile,
}: ProfileProps) => {
  const { updateDoctorProfile, isUpdatingDoctorProfile, isSuccess, isError } =
    useUpdateDoctorProfile()
  const doctorProfile = profile?.data
  const timeFrame = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
  ]
  const options = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ]

  const initialValues = {
    bio: doctorProfile?.bio ?? '',
    qualification: doctorProfile?.qualification ?? '',
    speciality: doctorProfile?.speciality ?? '',
    practiceNumber: doctorProfile?.practiseNumber ?? '',
    appointmentCost: doctorProfile?.appointmentCost ?? '',
    duration: doctorProfile?.duration ?? '',
    freeConsultation: doctorProfile?.freeConsultation ?? '',
  }
  const onSubmit = (values: IUpdateDoctorProfile) => {
    const credentials = {
      bio: values.bio,
      qualification: values.qualification,
      speciality: values.speciality,
      practiceNumber: values.practiceNumber,
      appointmentCost: values.appointmentCost,
      duration: values.duration,
      freeConsultation: values.freeConsultation,
    }
    updateDoctorProfile(credentials)
    setTimeout(() => {
      refetchDoctorProfile()
    }, 1000)
    console.log('Form data', values)
  }
  const validationSchema = Yup.object({
    bio: Yup.string().required('Bio cannot be empty'),
    qualification: Yup.string().required('Qualification cannot be empty'),
    speciality: Yup.string().required('Speciality cannot be empty'),
    practiceNumber: Yup.string().required('Practice number cannot be empty'),
    appointmentCost: Yup.string().required('Appointment cost cannot be empty'),
    duration: Yup.string().required('Duration cannot be empty'),
    freeConsultation: Yup.string().required(
      'Free consultation cannot be empty'
    ),
  })

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {isError && (
          <Alert severity="error">{isError || 'Something went wrong'}</Alert>
        )}
        {isSuccess && (
          <Alert severity="success">
            Medical information updated successfully.
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
            <div className={styles.formTopp}>
              Please fill the form to add your medical information
            </div>
            <Field name="bio" id="bio">
              {({ field, meta }) => {
                return (
                  <div>
                    <div className={styles.addMarginForm}>
                      About <span className={styles.opacify}>(bio)</span>
                    </div>
                    <TextField
                      {...field}
                      id="bio"
                      type="text"
                      multiline
                      maxRows={8}
                      placeholder="Teejay Teko"
                      className={styles.aboutHeight}
                    />
                    {meta.touched && meta.error && (
                      <div style={{ color: 'red' }}>{meta.error}</div>
                    )}
                  </div>
                )
              }}
            </Field>
            <br />
            <Field name="qualification" id="qualification">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Qualification"
                    placeholder="Teko"
                    id="qualification"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Field name="speciality" id="speciality">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Speciality"
                    placeholder="Teko"
                    id="speciality"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Field name="practiceNumber" id="practiceNumber">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Practice number"
                    placeholder="123456789"
                    id="practiceNumber"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <Field name="appointmentCost" id="appointmentCost">
              {({ field, meta }: any) => (
                <>
                  <Input
                    {...field}
                    label="Appointment cost"
                    placeholder="N1500.00"
                    id="appointmentCost"
                    type="number"
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: 'red' }}>{meta.error}</div>
                  )}
                </>
              )}
            </Field>
            <br />
            <div className={styles.relationship}>
              <Field name="duration" id="duration">
                {({ field, meta }: any) => (
                  <>
                    <div className={styles.addMarginForm}>
                      Appointment duration
                    </div>
                    <Select
                      id="duration"
                      {...field}
                      inputProps={{ 'aria-label': 'Without label' }}
                      fullWidth
                      displayEmpty
                      style={{
                        width: '100%',
                        borderRadius: '6px',
                        outline: 'none',
                      }}
                    >
                      <MenuItem value="">
                        <span className={styles.placeholder}>Select one</span>
                      </MenuItem>
                      {timeFrame?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              </Field>
            </div>
            <br />
            <div className={styles.relationship}>
              <Field name="freeConsultation" id="freeConsultation">
                {({ field, meta }: any) => (
                  <>
                    <div className={styles.addMarginForm}>
                      Do you want to offer free consultations?
                    </div>
                    <Select
                      id="freeConsultation"
                      {...field}
                      inputProps={{ 'aria-label': 'Without label' }}
                      fullWidth
                      displayEmpty
                      style={{
                        width: '100%',
                        borderRadius: '6px',
                        outline: 'none',
                      }}
                    >
                      <MenuItem value="">
                        <span className={styles.placeholder}>Select one</span>
                      </MenuItem>
                      {options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              </Field>
            </div>
            <Button
              type="submit"
              hg="50px"
              color="secondary"
              className={styles.presBtn}
              isLoading={isUpdatingDoctorProfile}
            >
              Edit profile
            </Button>
          </Form>
        </div>
      </Formik>
    </>
  )
}

export default PersonalInformation
