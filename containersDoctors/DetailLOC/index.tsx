import Input from 'componentsDoctors/Input'
import React, { useState } from 'react'
import calendarSvg from 'public/images/patient/settings/calendar.svg'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TimePicker from '@mui/lab/TimePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import { Label } from '@mui/icons-material'
import styles from './style.module.css'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from 'componentsDoctors/Button'
import { MenuItem, Select } from '@mui/material'

const DetailLOC = () => {
  const availableBloodGroups = [
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
  ]
  const availableGenotype = ['AA', 'AS', 'SS']
  const [defaultMethod, setDefaultMethod] = useState('')
  const [defaultMethod2, setDefaultMethod2] = useState('')
  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }
  const handleChange2 = (event) => {
    setDefaultMethod2(event.target.value as string)
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.formContainerForm}>
        <div className={styles.formTop}></div>
        <br />
        <div className={styles.relationship}>
          <div className={styles.relationshipInner}>Blood group</div>
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
            {availableBloodGroups?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className={`${styles.relationship} ${styles.gapme}`}>
          <div className={styles.relationshipInner}>Genotype</div>
          <Select
            value={defaultMethod2}
            onChange={handleChange2}
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
            displayEmpty
            renderValue={
              defaultMethod2 !== ''
                ? undefined
                : () => <span className={styles.placeholder}>Select one</span>
            }
            style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
          >
            {availableGenotype?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>

        <br />
        <Button
          type="submit"
          hg="50px"
          color="secondary"
          className={styles.presBtn}
        >
          Edit profile
        </Button>
      </form>
    </div>
  )
}

export default DetailLOC
