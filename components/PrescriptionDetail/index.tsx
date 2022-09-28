import Button from 'components/Button'
import Paper from 'components/Paper'
import styles from './styles.module.css'
import * as React from 'react'

const PrescriptionDetail = React.forwardRef(({ setState }: any, ref) => {
  return (
    <>
      <Paper>
        <div className={styles.wrapper} ref={ref as any}>
          <div className={styles.image}>
            <img src="/images/logo_dark.svg" alt="betacare" />
          </div>
          <p className={styles.date}>06-06-2021</p>
          <div className={styles.patient_details}>
            <p>Patient's Name</p>
            <p className={styles.patient_name}>Tejay Teko</p>
          </div>
          <div className={styles.precription_table}>
            <table>
              <thead>
                <tr>
                  <th>Drugs</th>
                  <th>Strenght</th>
                  <th>Dosage</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Panadol</td>
                  <td>500mg</td>
                  <td>1-2 tablets</td>
                  <td>5 days</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.direction}>
            <p>
              Take 1-2 tablets every 4-6 hours as required. Do not take more
              than 8 tablets in 24 hours.
            </p>
          </div>
          <div className={styles.doctor_details}>
            <p>Dr. Aniebiet Ubaha</p>
            <br />
            <p>Doctor</p>
          </div>
        </div>
      </Paper>
      <div>
        <Button
          color="primary"
          className={styles.button}
          onClick={() => setState('maps')}
        >
          Buy drugs
        </Button>
      </div>
    </>
  )
})

export default PrescriptionDetail
