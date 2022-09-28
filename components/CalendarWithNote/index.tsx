import { takeMonth } from 'utils/calendar'
import styles from './styles.module.css'
import { format, isSameMonth, isSameDay } from 'date-fns'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { ALL_DAYS, ALL_MONTHS, ALL_PSEUDO_DAYS } from 'constants/index'
import { headerGenerator } from 'utils/general/generateHeader'
import { baseUrl } from 'network/config/api'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import axios from 'axios'

const CalendarWithNote = ({
  setDayChosen,
  doctorId,
}: {
  setDayChosen: Function
  doctorId: number
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [notes, setNotes] = useState([])
  const [doctorAvailability, setDoctorAvailability] = useState(null)
  const [data, setData] = useState(null)

  const { token } = useRecoilValue(userAtom)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${baseUrl}/api/pt/availability/${doctorId}`,
          headerGenerator(token)
        )
        setDoctorAvailability(response?.data?.doctorAvailabilities)
      } catch (error) {}
    }
    if (doctorId) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId])

  const handleSelect = (day: any) => {
    setSelectedDate(day)
    setDayChosen(day)
  }

  useLayoutEffect(() => {
    const workDays = []
    if (doctorAvailability?.length > 0) {
      doctorAvailability.map((item: any) => workDays.push(item.workDay))
      setNotes([...workDays])
    } else {
      setNotes([])
    }
  }, [doctorAvailability])

  function dayColor(day: any) {
    if (!isSameMonth(day, selectedDate)) return 'nextStyle'
    if (isSameDay(day, selectedDate)) return styles.currentStyle
  }

  const noteDetector = (day: any) => {
    let status = false
    var d = new Date(day)
    var dayName = ALL_DAYS[d.getDay()]
    if (notes?.includes(dayName)) {
      status = true
    }
    return status
  }

  const buildDate = (str: string) => {
    const day = format(selectedDate, 'dd')
    const year = format(selectedDate, 'yyyy')
    const newDate = `${str} ${day} ${year}`
    handleSelect(new Date(newDate))
  }

  useEffect(() => {
    setData(takeMonth(selectedDate)())
  }, [selectedDate])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.heading}>
          <div>{format(selectedDate, 'yyyy')}</div>
          <select
            value={format(selectedDate, 'MMM')}
            onChange={(e) => buildDate(e.target.value)}
          >
            {ALL_MONTHS.map((monthName, i) => (
              <option key={i} value={monthName}>
                {monthName}
              </option>
            ))}
          </select>
          <div className={styles.yearormonth}>
            <div className="currentStyle">Month</div>
            <div>Year</div>
          </div>
        </div>
        <div className={styles.grid}>
          {ALL_PSEUDO_DAYS.map((dayName: any) => (
            <div className={styles.day_headers} key={dayName}>
              {dayName}
            </div>
          ))}
        </div>
        {data?.map((week: any, i: any) => (
          <div className={styles.grid} key={i}>
            {week.map((day: any, i: any) => (
              <Button
                key={i}
                role="button"
                sx={{
                  minWidth: 0,
                  padding: '0',
                }}
                disabled={!noteDetector(day)}
                onClick={() => handleSelect(day)}
                className={`${styles.dayNames} ${dayColor(day)} ${
                  noteDetector(day) && `${styles.expand}`
                }`}
              >
                {format(day, 'd')}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .nextStyle {
            color: #ddd;
          }
          .currentStyle {
            border: 1px solid #1890ff;
            border-radius: 2px;
          }
        `}
      </style>
    </div>
  )
}

export default CalendarWithNote
