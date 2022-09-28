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
import { useSetDoctorSignupStatus } from 'network/ReactQuery/Mutations/Admin/doctorSignupStatus'

type AppointmentProps = {
  title?: string
  doctorId?: number
  setOpenModal?: (open: boolean) => void
}
const RejectDoctorRequest = ({
  title,
  doctorId,
  setOpenModal,
}: AppointmentProps) => {
  const [error, setError] = React.useState(false)
  const [reason, setReason] = React.useState('')
  const { setDoctorSignupStatus } = useSetDoctorSignupStatus()

  const setStatus = () => {
    setDoctorSignupStatus({
      doctorId: doctorId,
      action: 'reject',
      reason: reason,
    })
  }

  return (
    <div className="wrapper">
      <p className="head">{title ? title : 'Give a reason'}</p>
      <div className="container">
        <form className="cancelForm">
          <FormControl
            sx={{ paddingBottom: '39px' }}
            error={error}
            variant="standard"
            style={{
              paddingBottom: '9px',
              textAlign: 'left',
              width: '100%',
              maxWidth: '100%',
              marginTop: '1rem',
            }}
          >
            <TextField
              style={{
                textAlign: 'left',
                width: '100%',
                maxWidth: '100%',
                marginTop: '1rem',
              }}
              multiline
              rows={7}
              placeholder="Type your reason..."
              className="formFielder"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="moveTop">
              <Button
                color="primary"
                wd="100%"
                hg="52"
                onClick={(e) => {
                  e.preventDefault()
                  setStatus()
                  setTimeout(() => {
                    setOpenModal(false)
                  }, 2000)
                }}
                type="submit"
              >
                Send
              </Button>
            </div>
          </FormControl>
        </form>
      </div>

      <style jsx>{`
        .head {
          margin-left: 0px;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: #333333;
        }
        .moveTop,
        .formFielder {
          margin-top: 30px;
        }
        .container {
          margin-top: -1rem;
        }
        .cancelForm div {
          max-width: '100%';
        }
      `}</style>
    </div>
  )
}

export default RejectDoctorRequest
