import { takeMonth } from 'utils/calendar'
import styles from './styles.module.css'
import {
  format,
  isSameMonth,
  isSameDay,
  startOfYear,
  monthsToQuarters,
} from 'date-fns'
import { useState } from 'react'

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
const Calendar = () => {
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
                className={`${styles.dayNames} ${dayColor(day)}`}
              >
                {format(day, 'd')}
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
