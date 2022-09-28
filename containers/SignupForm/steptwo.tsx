import Button from 'components/Button'
import Input from 'components/Input'
import React, { useEffect } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import { Auth } from 'types/authTypes'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useSignUp } from 'network/ReactQuery/Mutations/Auth/useSignUp'
import capitalizeInitial from 'utils/capitalizeInitial'

const validationSchema = Yup.object({
  gender: Yup.string().required('Field cannot be empty'),
  dateOfBirth: Yup.string().required('Field cannot be empty'),
})
function formatDate(date) {
  return date.split('-').reverse().join('-')
}

const StepTwo = ({ prev, data, setError, setSuccess }) => {
  const { signUp, isSigningUp, error, isSuccess } = useSignUp()

  const formik = useFormik({
    validationSchema,
    initialValues: {
      password: data.password,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
    },
    onSubmit: (
      values: Auth.SignupCredentials,
      actions: FormikHelpers<Auth.SignupCredentials>
    ) => {
      const credentials: Auth.SignupCredentials = {
        password: data.password,
        email: data.email,
        firstName: capitalizeInitial(data.firstName),
        lastName: capitalizeInitial(data.lastName),
        phoneNumber: data.phoneNumber,
        gender: values.gender,
        dateOfBirth: formatDate(values.dateOfBirth),
        platform: 'web',
      }
      signUp(credentials)
    },
  })



  useEffect(() => {
    setError(error)
    setSuccess(isSuccess)
  }, [error, isSuccess])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.form}>
          <FormControl
            component="fieldset"
            sx={{
              width: '100%',
            }}
            className={styles.input}
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              onChange={formik.handleChange}
              name="gender"
              value={formik.values.gender}
              className={styles.radioGroup}
              sx={{
                flexDirection: 'row',
                gap: '12px',
              }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                sx={{ margin: 0 }}
                className={
                  formik.values.gender === 'Female' ||
                    formik.values.gender === ''
                    ? styles.activeRadio
                    : ''
                }
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                sx={{ margin: 0 }}
                className={
                  formik.values.gender === 'Male' ? styles.activeRadio : ''
                }
              />
            </RadioGroup>
          </FormControl>

          <Input
            type="date"
            styleName={styles.input}
            placeholder="Last Name"
            name="dateOfBirth"
            defaultValue={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Date of birth"
            error={
              formik.errors.dateOfBirth && formik.touched.dateOfBirth
                ? formik.errors.dateOfBirth
                : null
            }
          />
          <div className="buttons">
            <Button
              type="button"
              color="secondary"
              onClick={() => prev(formik.values)}
            >
              <KeyboardBackspaceIcon /> Back
            </Button>

            <Button
              isLoading={isSigningUp}
              type="submit"
              color="primary"
              disabled={!!formik.errors.dateOfBirth}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.form}></div>
      <style jsx>{`
        .buttons {
          display: flex;
          gap: 8px;
        }
      `}</style>
    </>
  )
}

export default StepTwo
