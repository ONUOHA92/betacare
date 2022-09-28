import React from 'react'
import styles from './style.module.css'

interface Props {
  title?: String
  content?: String
  phone?: String
}

const index = ({ title, content, phone, singleBtn, setMakeRequest }) => {
  return (
    <div className={styles.rightCards1}>
      <div className={styles.rightCardsSvg}>
        <svg
          width="43"
          height="37"
          viewBox="0 0 43 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.306 1.82842C26.8681 0.266326 29.4008 0.26633 30.9629 1.82843L41.1714 12.037C42.7335 13.5991 42.7335 16.1317 41.1714 17.6938L30.9629 27.9023C29.4008 29.4644 26.8681 29.4644 25.306 27.9023L15.0975 17.6938C13.5354 16.1317 13.5354 13.5991 15.0975 12.037L25.306 1.82842Z"
            fill="#EBEBEB"
          />
          <path
            d="M12.037 9.32842C13.5991 7.76633 16.1317 7.76633 17.6938 9.32843L27.9023 19.537C29.4644 21.0991 29.4644 23.6317 27.9023 25.1938L17.6938 35.4023C16.1317 36.9644 13.5991 36.9644 12.037 35.4023L1.82842 25.1938C0.266326 23.6317 0.26633 21.0991 1.82843 19.537L12.037 9.32842Z"
            fill="#97C3F9"
          />
        </svg>
      </div>

      <div className={styles.rightCardsHead}>{title} </div>
      <div className={styles.rightCardsContent}>{content}</div>
      <div className={styles.rightCardsPhone}>{phone}</div>
    </div>
  )
}

export default index
function setMakeRequest(arg0: boolean): void {
  throw new Error('Function not implemented.')
}
