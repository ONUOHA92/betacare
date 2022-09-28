import styles from './styles.module.css'
import { useState } from 'react'
import Button from 'componentsDoctors/Button'
import Popups from 'componentsDoctors/Popup'
import Calendar from 'componentsDoctors/Calendar'
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

const BookAppointments = ({
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

  const handleChange = (event) => {
    setDefaultTime(event.target.value as string)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_group}>
        <label>Choose available date</label>
        <Calendar />
      </div>
      <div className={styles.form_group}>
        <label>Choose an available time</label>
        <Select
          value={defaultTime}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          fullWidth
          style={{ width: '100%', borderRadius: '12px' }}
        >
          {availableTime?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Button color="primary" onClick={() => setOpen(true)}>
        Book appointment
      </Button>

      <Popups isOpen={open} current="bookSuccess" handleClose={handleClose} />
    </div>
  )
}

export default BookAppointments
