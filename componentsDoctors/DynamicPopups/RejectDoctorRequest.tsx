import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Button from 'componentsDoctors/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Popups from 'componentsDoctors/Popup'
import CancelAppointmentFinal from './CancelAppointmentFinal'

type AppointmentProps = {
  title: string
}
const RejectDoctorRequest = ({ title }: AppointmentProps) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(false)
  const [open, setOpen] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleRadioChange = (event) => {
    setValue(event.target.value)
    setError(false)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleFinalCancellation = () => {
    setOpenCancel(true)
  }

  const closeAllModal = () => {
    setOpenCancel(false)
    setOpen(false)
  }

  const whyCancel = ['Option1', 'Option2', 'Option3', 'Others']
  return !openCancel ? (
    <div className="wrapper">
      <p className="head">{title ? title : 'Reasons for cancellation'}</p>
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
            <TextField
              style={{
                textAlign: 'left',
                maxWidth: '100%',
                marginTop: '1rem',
              }}
              multiline
              rows={7}
              placeholder="Type..."
              className="formFielder"
            />

            <div className="moveTop">
              <Button
                color="primary"
                wd="482px"
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
      closeAllModal={closeAllModal}
      title={title}
      value={value}
    />
  )
}

export default RejectDoctorRequest
