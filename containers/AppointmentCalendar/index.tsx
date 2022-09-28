import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import Button from 'components/Button'
import Popups from 'components/Popup'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useBookAppointment } from 'network/ReactQuery/Mutations/Appointment/useBookAppointment'
import { useRecoilValue } from 'recoil'
import { toISOStringLocal } from 'utils/calendar'
import { DOCTOR_AVAIALABLE_TIME, DOCTOR_AVAIALABLE_DAYS } from 'constants/index'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { baseUrl } from 'network/config/api'
import { headerGenerator } from 'utils/general/generateHeader'
import axios from 'axios'
import dynamic from 'next/dynamic'

const CalendarWithNote = dynamic(() => import('components/CalendarWithNote'), {
  ssr: false,
})

interface Props {
  wd?: String
  hgt?: String
  doctorId: number
  setBookingEligibility: Function
  bookingEligibility: any
}

const AppointmentCalender = ({
  doctorId,
  bookingEligibility,
  setBookingEligibility,
}: React.PropsWithChildren<Props>) => {
  const [options, setOptions] = useState(null)
  const [open, setOpen] = useState(false)
  const [dayChosen, setDayChosen] = useState(new Date())
  const [doctorAvailability, setDoctorAvailability] = useState([])
  const [defaultTime, setDefaultTime] = useState('')

  const { bookAppointmentMutation, bookAppointmentLoading } =
    useBookAppointment()

  const handleClose = () => {
    setOpen(false)
  }

  const handleBookAppointment = () => {
    if (!defaultTime || !dayChosen) {
    } else {
      const payload = {
        appointmentDate: toISOStringLocal(dayChosen),
        appointmentTime: defaultTime,
        doctorId,
      }
      bookAppointmentMutation
        .mutateAsync(payload)
        .then((res) => handleClose())
        .catch((err) => console.log(err))
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setDefaultTime(event.target.value as string)
  }

  const { token } = useRecoilValue(userAtom)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${baseUrl}/api/pt/availability/${doctorId}`,
          headerGenerator(token)
        )
        const responseBookingEligibility = await axios.post(
          `${baseUrl}/api/pt/can-book-appointment/${doctorId}`,
          {},
          headerGenerator(token)
        )
        setDoctorAvailability(response?.data?.doctorAvailabilities)
        setBookingEligibility(responseBookingEligibility?.data)
      } catch (error) {
        setBookingEligibility(error?.response?.data)
      }
    }
    if (doctorId) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId])

  useEffect(() => {
    if (doctorAvailability?.length > 0) {
      const select = doctorAvailability?.find(
        (item) =>
          item?.workDay?.toLowerCase() ===
          noteDetector(dayChosen)?.value?.toLowerCase()
      )
      if (select) {
        const restructuredDoctorAvailableTime = DOCTOR_AVAIALABLE_TIME?.map(
          (item) => {
            return item?.value
          }
        )
        const newTime = restructuredDoctorAvailableTime?.slice(
          restructuredDoctorAvailableTime?.indexOf(select?.startWorkTime),
          restructuredDoctorAvailableTime?.indexOf(select?.endWorkTime) + 1
        )
        setOptions([...newTime])
      }
    } else {
      setDefaultTime('')
      setOptions(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayChosen, doctorAvailability])

  const noteDetector = (day: any) => {
    var d = new Date(day)
    var dayName = DOCTOR_AVAIALABLE_DAYS[d.getDay()]
    return dayName
  }

  const unableToBookAppointment = () => {
    return
  }

  return (
    <span className="addFlex">
      <CalendarWithNote setDayChosen={setDayChosen} doctorId={doctorId} />
      <div className={styles.form_group}>
        <label htmlFor="">Choose an available time</label>
        <Select
          value={defaultTime}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          fullWidth
          renderValue={
            defaultTime !== ''
              ? undefined
              : () => <span className={styles.placeholder}>Select one</span>
          }
          style={{ width: '100%', maxWidth: '100%' }}
        >
          {options?.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.addMargin}>
        <Button
          color="primary"
          disabled={
            bookAppointmentLoading ||
            bookingEligibility?.canBookAppointment === false ||
            !!bookingEligibility?.message
          }
          onClick={
            bookingEligibility?.canBookAppointment === true
              ? () => handleBookAppointment()
              : () => unableToBookAppointment()
          }
          isLoading={bookAppointmentLoading}
        >
          Book appointment
        </Button>
      </div>
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
