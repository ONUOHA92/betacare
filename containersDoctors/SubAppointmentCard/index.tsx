import React, { useState } from 'react'
import styles from './style.module.css'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import calendar from 'public/images/icons/plain_calendar.svg'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import SelectDoctorCard from 'containersDoctors/SelectDoctorCard'
import AppointmentCalendar from 'containersDoctors/AppointmentCalendar'

interface Props {
  wd?: string
  hg?: string
  enableAppointment?: Function
}

const options = [
  'Gynaecologist',
  'Paediatrician',
  'Oncologist',
  'Therapist',
  'Orthodontist',
  'Oculist',
  'Psychiatrist',
  'ENT',
  'Dentist',
]

const SubAppointmentCard = ({
  wd,
  hg,
  enableAppointment,
}: React.PropsWithChildren<Props>) => {
  // Core states
  const [bookAppointment, setBookAppointment] = useState(false)
  const [doctorType, setDoctorType] = React.useState('')

  const [chooseDoctor, setChooseDoctor] = useState(false)
  const [displayDoctor, setDisplayDoctor] = useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    setDisplayDoctor(true)
    setDoctorType(event.target.value as string)
  }

  return (
    <>
      <Card
        sx={{ width: wd ? wd : '1036px', height: hg ? hg : '190px' }}
        className={`${styles.addBoxShadow}`}
      >
        <CardContent>
          <div className={styles.appointmentCard}>
            <div className={styles.appointmentText}>
              <Image src={calendar} alt="" />
              Book an Appointment
            </div>
            <div>Who would you like to see?</div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  value={doctorType}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                  displayEmpty
                  fullWidth
                  style={{ width: '450px', maxWidth: '100%' }}
                  renderValue={
                    doctorType !== '' ? undefined : () => 'Select Doctor Type'
                  }
                >
                  {options?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </CardContent>
      </Card>
      {displayDoctor && (
        <div className={styles.bothCards}>
          <SelectDoctorCard setChooseDoctor={setChooseDoctor} />
          {chooseDoctor && (
            <div className={styles.calender}>
              <AppointmentCalendar enableAppointment={enableAppointment} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SubAppointmentCard
