import React from 'react'
import styles from './style.module.css'

function TimeLine({
  day,
  start,
  end,
  entry,
  removeHandler,
  removeHandlerById
}: {
  day: string
  start: string
  end: string
  entry: any
  // oldEntry: any
  removeHandler: () => void
  removeHandlerById: any
}) {
  return (
    <div className={styles.spreader}>
      <div>{day}</div>
      <div className={styles.right}>
        <span>
          {start} - {end}
        </span>



        {entry === 'new-entry' ? (
          <svg
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={removeHandler}
            className={styles.pointer}
          >
            <path
              d="M5.93996 4.49882L8.80663 1.63882C8.93216 1.51329 9.00269 1.34302 9.00269 1.16549C9.00269 0.987954 8.93216 0.817691 8.80663 0.692155C8.68109 0.566619 8.51083 0.496094 8.33329 0.496094C8.15576 0.496094 7.9855 0.566619 7.85996 0.692155L4.99996 3.55882L2.13996 0.692155C2.01442 0.566619 1.84416 0.496094 1.66663 0.496094C1.48909 0.496094 1.31883 0.566619 1.19329 0.692155C1.06776 0.817691 0.997231 0.987954 0.997231 1.16549C0.997231 1.34302 1.06776 1.51329 1.19329 1.63882L4.05996 4.49882L1.19329 7.35882C1.13081 7.4208 1.08121 7.49453 1.04737 7.57577C1.01352 7.65701 0.996094 7.74415 0.996094 7.83215C0.996094 7.92016 1.01352 8.0073 1.04737 8.08854C1.08121 8.16978 1.13081 8.24351 1.19329 8.30549C1.25527 8.36797 1.329 8.41757 1.41024 8.45142C1.49148 8.48526 1.57862 8.50269 1.66663 8.50269C1.75463 8.50269 1.84177 8.48526 1.92301 8.45142C2.00425 8.41757 2.07798 8.36797 2.13996 8.30549L4.99996 5.43882L7.85996 8.30549C7.92194 8.36797 7.99567 8.41757 8.07691 8.45142C8.15815 8.48526 8.24529 8.50269 8.33329 8.50269C8.4213 8.50269 8.50844 8.48526 8.58968 8.45142C8.67092 8.41757 8.74465 8.36797 8.80663 8.30549C8.86911 8.24351 8.91871 8.16978 8.95255 8.08854C8.9864 8.0073 9.00383 7.92016 9.00383 7.83215C9.00383 7.74415 8.9864 7.65701 8.95255 7.57577C8.91871 7.49453 8.86911 7.4208 8.80663 7.35882L5.93996 4.49882Z"
              fill="#333333"
            />
          </svg>
        ) : (
          <>
            <span className={styles.addPadd}></span>
          </>
        )}

        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={removeHandlerById}
          className={styles.pointer}
        >
          <path
            d="M5.93996 4.49882L8.80663 1.63882C8.93216 1.51329 9.00269 1.34302 9.00269 1.16549C9.00269 0.987954 8.93216 0.817691 8.80663 0.692155C8.68109 0.566619 8.51083 0.496094 8.33329 0.496094C8.15576 0.496094 7.9855 0.566619 7.85996 0.692155L4.99996 3.55882L2.13996 0.692155C2.01442 0.566619 1.84416 0.496094 1.66663 0.496094C1.48909 0.496094 1.31883 0.566619 1.19329 0.692155C1.06776 0.817691 0.997231 0.987954 0.997231 1.16549C0.997231 1.34302 1.06776 1.51329 1.19329 1.63882L4.05996 4.49882L1.19329 7.35882C1.13081 7.4208 1.08121 7.49453 1.04737 7.57577C1.01352 7.65701 0.996094 7.74415 0.996094 7.83215C0.996094 7.92016 1.01352 8.0073 1.04737 8.08854C1.08121 8.16978 1.13081 8.24351 1.19329 8.30549C1.25527 8.36797 1.329 8.41757 1.41024 8.45142C1.49148 8.48526 1.57862 8.50269 1.66663 8.50269C1.75463 8.50269 1.84177 8.48526 1.92301 8.45142C2.00425 8.41757 2.07798 8.36797 2.13996 8.30549L4.99996 5.43882L7.85996 8.30549C7.92194 8.36797 7.99567 8.41757 8.07691 8.45142C8.15815 8.48526 8.24529 8.50269 8.33329 8.50269C8.4213 8.50269 8.50844 8.48526 8.58968 8.45142C8.67092 8.41757 8.74465 8.36797 8.80663 8.30549C8.86911 8.24351 8.91871 8.16978 8.95255 8.08854C8.9864 8.0073 9.00383 7.92016 9.00383 7.83215C9.00383 7.74415 8.9864 7.65701 8.95255 7.57577C8.91871 7.49453 8.86911 7.4208 8.80663 7.35882L5.93996 4.49882Z"
            fill="#333333"
          />
        </svg>
      </div>
    </div>
  )
}

export default TimeLine
