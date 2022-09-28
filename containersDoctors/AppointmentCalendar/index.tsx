import styles from './styles.module.css'
import TextField from '@mui/material/TextField'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import { useState } from 'react'
import Button from 'componentsDoctors/Button'
import Calendar from 'componentsDoctors/Calendar'
import Popups from 'componentsDoctors/Popup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

//Modified
interface Props {
  wd?: String
  hgt?: String
  enableAppointment?: Function
}

const AppointmentCalender = ({
  wd,
  hgt,
  enableAppointment,
}: React.PropsWithChildren<Props>) => {
  const [value, setValue] = useState(new Date())
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleCTA = () => {
    enableAppointment()
    setOpen(true)
  }

  const availableTime = [
    '8:00am',
    '9:00am',
    '10:00am',
    '11:00am',
    '12:00pm',
    '2:00pm',
    '4:00pm',
  ]

  const [defaultTime, setDefaultTime] = useState(availableTime[0])

  const handleChange = (event: SelectChangeEvent) => {
    setDefaultTime(event.target.value as string)
  }

  return (
    <span className="addFlex">
      <Calendar />

      <div className={styles.form_group}>
        <label htmlFor="">Choose an available time</label>
        <Select
          value={defaultTime}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          fullWidth
          style={{ width: '450px', maxWidth: '100%' }}
        >
          {availableTime?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.addMargin}>
        <Button color="primary" onClick={() => handleCTA()}>
          Book appointment
        </Button>
      </div>
      <Popups isOpen={open} current="bookSuccess" handleClose={handleClose} />
      <style jsx>{`
        .addFlex {
          display: flex;
          flex-direction: column;
          gap: 21px;
          padding: 20px;
        }
      `}</style>
    </span>
  )
}

export default AppointmentCalender
