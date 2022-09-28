import Input from 'components/Input'
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
import Button from 'components/Button'
import { MenuItem, Select } from '@mui/material'

const SubscriptionCancel = () => {
  const availableBanks = ['Zenith', 'Uba', 'Union', 'Ecoback', 'Access']
  const availablePlans = [
    'Starters ',
    'Basic',
    'Weekly',
    'Monthly',
    'Monthly Family',
    'Coporate Monthly',
  ]
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
          <div className={styles.relationshipInner}>Bank Name</div>
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
            {availableBanks?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
        <br />
        <div className={styles.relationship}>
          <div className={styles.relationshipInner}>Card Number</div>
          <Input placeholder="9808 0982 0199" type="number" />
        </div>
        <br />
        <div className={styles.expiryCvv}>
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>Expiry date</div>
            <Input
              type="date"
              styleName={styles.input}
              name="expirydate"
              defaultValue={'06-11-1991'}
            />
          </div>

          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>CVV</div>

            <Input
              type="number"
              styleName={styles.input}
              name="cvv"
              placeholder={'982'}
            />
          </div>
        </div>

        <div className={`${styles.relationship} ${styles.gapme}`}>
          <div className={styles.relationshipInner}>Select price plan</div>
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
            {availablePlans?.map((option) => (
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
          disabled
        >
          Cancel plan
        </Button>
      </form>
    </div>
  )
}

export default SubscriptionCancel
