import styles from './styles.module.css'
import { useState } from 'react'
import Button from 'componentsDoctors/Button'
import Popups from 'componentsDoctors/Popup'
import Calendar from 'componentsDoctors/Calendar'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Input from 'componentsDoctors/Input'
import { TextField } from '@mui/material'

interface Props {
  wd?: String
  hgt?: String
}

const Index = ({ wd, hgt }: React.PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const availableServices = ['Service 1', 'Service 2', 'Service 3', 'Service 4']
  const [defaultAvailableMethod, setDefaultAvailableMethod] = useState('')

  const handleAvailableChange = (event) => {
    setDefaultAvailableMethod(event.target.value as string)
  }

  const availableTime = ['11.00 am', '12.00 pm', '1.00 pm', '2.00 pm']
  const [defaultAvailableMethod2, setDefaultAvailableMethod2] = useState('')

  const handleAvailableChange2 = (event) => {
    setDefaultAvailableMethod2(event.target.value as string)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headText}>
        Please fill the form to book an appointment
      </div>
      <div className={styles.form_group}>
        <label>Patients name</label>
        <Input type={'text'} label="" placeholder="Teejay Teko" />
      </div>
      <div className={styles.form_group}>
        <label>Select service</label>
        <Select
          value={defaultAvailableMethod}
          onChange={handleAvailableChange}
          inputProps={{ 'aria-label': 'Without label' }}
          fullWidth
          displayEmpty
          renderValue={
            defaultAvailableMethod !== ''
              ? undefined
              : () => <span className={styles.placeholder}>Select one</span>
          }
          style={{ width: '100%', borderRadius: '12px' }}
        >
          {availableServices?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.form_group}>
        <label>Price</label>
        <Input type={'text'} placeholder="N12,000.00" />
      </div>

      <div className={styles.form_group}>
        <label>Choose an available date</label>
        <Calendar />
      </div>

      <div className={styles.form_group}>
        <label>Choose an available time</label>
        <Select
          value={defaultAvailableMethod2}
          onChange={handleAvailableChange2}
          inputProps={{ 'aria-label': 'Without label' }}
          fullWidth
          displayEmpty
          style={{ width: '100%', borderRadius: '12px' }}
          renderValue={
            defaultAvailableMethod2 !== ''
              ? undefined
              : () => <span className={styles.placeholder}>Select one</span>
          }
        >
          {availableTime?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Button color="primary" onClick={() => setOpen(true)}>
        Book Appointment
      </Button>

      <Popups
        isOpen={open}
        current="ambulanceRequest"
        handleClose={handleClose}
      />
    </div>
  )
}

export default Index
