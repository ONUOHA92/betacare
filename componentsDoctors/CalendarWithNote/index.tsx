import { takeMonth } from 'utils/calendar'
import styles from './styles.module.css'
import {
  format,
  isSameMonth,
  isSameDay,
  startOfYear,
  monthsToQuarters,
} from 'date-fns'
import { useState, useEffect } from 'react'

type CalenderProps = {
  noteDetails: string[]
  docAvailability: []
  interval: any[]
}
function WeekNames() {
  return (
    <div className={styles.grid}>
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayName) => (
        <div className={styles.day_headers} key={dayName}>
          {dayName}
        </div>
      ))}
    </div>
  )
}
const Calendar = ({
  noteDetails,
  interval,
  docAvailability,
}: CalenderProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const data = takeMonth(selectedDate)()

  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  function dayColor(day) {
    if (!isSameMonth(day, selectedDate)) return 'nextStyle'
    if (isSameDay(day, selectedDate)) return 'currentStyle'
  }

  const notes = noteDetails

  const noteDetector = (day: { toString: () => string }) => {
    let status = false
    const allDays = day.toString().substring(0, 3).toUpperCase()
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].toString().substring(0, 3) == allDays) {
        status = true
      }
    }

    return status
  }
  console.log(docAvailability)
  const buildDate = (str) => {
    const day = format(selectedDate, 'dd')
    const year = format(selectedDate, 'yyyy')
    const newDate = `${str} ${day} ${year}`
    setSelectedDate(new Date(newDate))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.heading}>
          <div>{format(selectedDate, 'yyyy')}</div>
          <select
            value={format(selectedDate, 'MMM')}
            onChange={(e) => buildDate(e.target.value)}
          >
            {MONTHS.map((monthName, i) => (
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
        <WeekNames />
        {data.map((week, i) => (
          <div className={styles.grid} key={i}>
            {week.map((day, i) => (
              <div
                key={i}
                onClick={() => setSelectedDate(day)}
                className={`${styles.dayNames} ${dayColor(day)} ${
                  noteDetector(day) ? styles.expand : styles.noNote
                }`}
              >
                {format(day, 'd')}
                {noteDetector(day) &&
                  docAvailability
                    .filter(
                      (workDay: any) =>
                        workDay.workDay.toString().substring(0, 3) ==
                        day.toString().substring(0, 3).toUpperCase()
                    )
                    .map((workDay: any) => (
                      <>
                        <p className={styles.text} key={workDay.id}>
                          {workDay.startWorkTime + ' - ' + workDay.endWorkTime}
                        </p>
                        <p className={styles.smallText} key={workDay.id}>
                          {' '}
                          {workDay.startWorkTime + ' - ' + workDay.endWorkTime}
                        </p>
                      </>
                    ))}
              </div>
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

export default Calendar
