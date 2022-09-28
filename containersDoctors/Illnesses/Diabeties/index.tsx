import Input from 'componentsDoctors/Input'
import BlankCardModal from 'componentsDoctors/BlankCardModal'
import Button from 'componentsDoctors/Button'
import EmergencyCard from 'containersDoctors/EmergencyCard'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { MenuItem, Select } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Stack from '@mui/material/Stack'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { EMERGENGENCY_RELATIONSHIP_ENUM } from 'constants/constants'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
interface Props {
  open?: boolean
  handleClose?: () => void
}

const Diabeties = ({ open, handleClose }: React.PropsWithChildren<Props>) => {
  const [defaultMethod, setDefaultMethod] = useState('')
  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleChange2 = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <>
      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'680px'}
      >
        <form className={styles.formContainerForm}>
          <div className={styles.formTopp}></div>
          <div className={styles.topText}>
            Please fill the form to add your medical details
          </div>
          <div className={styles.relationshipInner}>
            {' '}
            Are you on Insulin/Tablets ?
          </div>
          <FormGroup>
            <FormControlLabel disabled control={<Checkbox />} label="Insulin" />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  defaultChecked
                  sx={{
                    color: '#1F56C3',
                    '&.Mui-checked': {
                      color: '#1F56C3',
                    },
                  }}
                />
              }
              label="Tablet"
            />
          </FormGroup>

          <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
            Diabetics type
          </div>
          <FormGroup>
            <FormControlLabel disabled control={<Checkbox />} label="Type 1" />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  defaultChecked
                  sx={{
                    color: '#1F56C3',
                    '&.Mui-checked': {
                      color: '#1F56C3',
                    },
                  }}
                />
              }
              label="Type 2"
            />
          </FormGroup>
          <div className={styles.stswrapper}>
            <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
              Current medications
            </div>
            <TextField
              multiline={true}
              rows={3}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E5E5',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                },
                '& .MuiInputBase-root': {
                  backgroundColor: '#F9F9FB',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '##E5E5E5',
                  border: '1px solid #E5E5E5',
                },
                '& .MuiInputBase-input': {
                  height: '93px',
                  maxWidth: '100%',
                },
              }}
            />
          </div>
          <div className={styles.stswrapper}>
            <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
              Details
            </div>
            <TextField
              multiline={true}
              rows={3}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E5E5',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                },
                '& .MuiInputBase-root': {
                  backgroundColor: '#F9F9FB',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '##E5E5E5',
                  border: '1px solid #E5E5E5',
                },
                '& .MuiInputBase-input': {
                  height: '93px',
                  maxWidth: '100%',
                },
              }}
            />
          </div>

          <br />
          <div className={styles.gapSmall}>
            How long have you had this illness
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange2}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <br />
          <br />

          <Button
            type="submit"
            hg="50px"
            color="primary"
            className={styles.presBtn}
          >
            Save details
          </Button>
        </form>
      </BlankCardModal>
    </>
  )
}

export default Diabeties
