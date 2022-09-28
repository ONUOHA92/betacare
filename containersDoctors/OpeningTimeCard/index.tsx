import DisplayItem from 'componentsDoctors/DisplayItem'
import styles from './styles.module.css'

const OpeningTimeCard = ({ opening_times }) => {
  return (
    <div className={styles.items}>
      <DisplayItem icon="/images/patient/clock.svg" headding="Opening time" />
      {opening_times.map((time) => (
        <DisplayItem day={time.day} time={time.time} />
      ))}
    </div>
  )
}

export default OpeningTimeCard
