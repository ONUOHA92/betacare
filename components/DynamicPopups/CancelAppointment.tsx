import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Button from 'components/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Popups from 'components/Popup'
import CancelAppointmentFinal from './CancelAppointmentFinal'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'


// const validationSchema = Yup.object({
//   firstName: Yup.string().required('Field cannot be empty'),
//   lastName: Yup.string().required('Field cannot be empty'),
//   phoneNumber: Yup.string().required('Field cannot be empty'),
//   email: Yup.string()
//     .email('Must be valid email')
//     .required('Must be valid email'),
//   password: Yup.string()
//     .min(8, 'Password cannot be less than 8 characters')
//     .matches(/[a-z]/, 'Password must have lowercase')
//     .matches(/[A-Z]/, 'Password must have at least one uppercase')
//     .matches(/\d/, 'Password must have numbers')
//     .matches(/[a-z]/, 'Password must have lowercase')
//     .required('Password cannot be empty'),
// })

const CardAppointment = ({ appointmentId, handleClose }) => {
  const [value, setValue] = React.useState('')
  const [reason, setReason] = React.useState('')
  const [error, setError] = React.useState(false)
  const [open, setOpen] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)

  const handleRadioChange = (event) => {
    setValue(event.target.value)
    setReason(event.target.value)
    setError(false)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleFinalCancellation = () => {
    setOpen(true)
    setOpenCancel(true)
  }

  const closeAllModal = () => {
    setOpenCancel(false)
    setOpen(false)
  }

  const whyCancel = [
    'I have selected a wrong date and time',
    'I would like to book another doctor',
    'Accidental Request',
    'Others',
  ]


  // React.useEffect(() => {
  //   // dispatch(destroyCancelAppointment())
  //   dispatch(getAppointments.request({ size: 12 }))
  // }, [dispatch])

  return !openCancel ? (
    <div className="wrapper">
      <p className="head">Reasons for cancellation</p>
      <div className="container">
        <form className="cancelForm">
          <FormControl
            sx={{ m: 3, paddingBottom: '39px' }}
            error={error}
            variant="standard"
            style={{
              paddingBottom: '9px',
            }}
          >
            <div className="radio">
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={value}
                onChange={handleRadioChange}
              >
                {whyCancel?.map((reason) => (
                  <FormControlLabel
                    key={reason}
                    value={reason}
                    control={
                      <Radio
                        sx={{
                          color: '#1F56C3',
                          '&.Mui-checked': {
                            color: '#1F56C3',
                          },
                        }}
                      />
                    }
                    label={reason}
                  />
                ))}
              </RadioGroup>
            </div>
            {value === 'Others' && (
              <TextField
                style={{
                  textAlign: 'left',
                  maxWidth: '100%',
                  marginTop: '1rem',
                }}
                multiline
                rows={7}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Type..."
                className="formFielder"
              />
            )}
            <div className="moveTop">
              <Button
                color="primary"
                wd="80%"
                hg="52"
                onClick={() => handleFinalCancellation()}
              >
                Submit
              </Button>
            </div>
          </FormControl>
          <Popups
            isOpen={open}
            current="cancelAppointmentFinal"
            handleClose={handleClose}
            appointmentId={appointmentId}
            // closeAppointment={handleClose}
          />
        </form>
      </div>

      <style jsx>{`
        .head {
          margin-left: 30px;
        }
        .moveTop,
        .formFielder {
          margin-top: 30px;
        }
        .container {
          margin-top: -1rem;
        }
      `}</style>
    </div>
  ) : (
    <CancelAppointmentFinal
      closeAllModal={handleClose}
      appointmentId={appointmentId}
      reason={reason}
    />
  )
}

export default CardAppointment
