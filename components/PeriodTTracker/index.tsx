import Input from 'components/Input'
import Button from 'components/Button'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { Alert, Stack } from '@mui/material'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Patients } from 'types/patientsTypes'
import moment from 'moment'
import { useUpdateUserProfile } from 'network/ReactQuery/Mutations/Profile/useUpdateUserProfile'
import { useUpdateUserPeriodTracker } from 'network/ReactQuery/Mutations/Profile/useUpdateUserPeriodTracker'
import { useNextPeriod } from 'network/ReactQuery/Queries/Profile/useNextPeriod'
import { IPeriodTracker } from 'interface/profile'


const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface Props {
  open?: boolean
  handleClose?: () => void
}

const PeriodTracker = ({
  open,
  handleClose,
}: React.PropsWithChildren<Props>) => {
  const [displayNextPeriod, setDisplayNextPeriod] = useState(false)
  const [value, setValue] = React.useState<Date | null>(new Date())
  const [value2, setValue2] = React.useState<Date | null>(new Date())
  const { userPeriodTrackerMutation, periodTrackerMutationLoading } =
    useUpdateUserPeriodTracker()
  const { nextPeriodDate, status, refetchNextPeriodDate } = useNextPeriod()

  const handleChangeBasic = (newValue: Date | null) => {
    setValue(newValue)
  }

  const handleChangeBasic2 = (newValue: Date | null) => {
    setValue2(newValue)
  }

  const validationSchema = Yup.object({
    menstrualPeriodCycleLength: Yup.number().required(
      'menstrualPeriodCycleLength cannot be empty'
    ),
    menstrualPeriodFlowLength: Yup.number().required(
      'menstrualPeriodFlowLength cannot be empty'
    ),
    weight: Yup.string().required('weight cannot be empty'),
    height: Yup.string().required('height cannot be empty'),
  })

  useEffect(() => {
    setDisplayNextPeriod(false)
  }, [])



  const formik = useFormik({
    validationSchema,
    initialValues: {
      menstrualPeriodCycleLength: 0,
      menstrualPeriodFlowLength: 0,
      weight: '',
      height: '',
    },
    onSubmit: (values: IPeriodTracker) => {
      const newCredentials = {
        ...values,
        lastPeriodStartDate: moment(value).format('DD-MM-YYYY'),
      }
      userPeriodTrackerMutation
        .mutateAsync(newCredentials)
        .then(() => refetchNextPeriodDate())
        .catch((err) => console.log(err))
    },
  })

  useEffect(() => {
    if (status === 'success') {
      setValue2(nextPeriodDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <>

      <div className={styles.formContainer}>
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>
          <div className={styles.topText}>
            Please fill the form to track Period and get reminder alert
          </div>

          <br />
          <div className={styles.relationship}>
            <div
              className={`${styles.relationshipInner} ${styles.addBottomMargin}`}
            >
              Start Date of Last Period
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChangeBasic}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
          <br />
          {nextPeriodDate && (
            <>
              <div className={styles.relationship}>
                <div
                  className={`${styles.relationshipInner} ${styles.addBottomMargin}`}
                >
                  Next Period Start Date
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      disabled
                      value={value2}
                      onChange={handleChangeBasic2}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <br />
            </>
          )}
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>Cycle length</div>
            <Input
              placeholder="days"
              type="number"
              required
              name="menstrualPeriodCycleLength"
              value={formik.values.menstrualPeriodCycleLength}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.menstrualPeriodCycleLength &&
                  formik.touched.menstrualPeriodCycleLength
                  ? formik.errors.menstrualPeriodCycleLength
                  : null
              }
            />
          </div>
          <br />
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>Flow length</div>
            <Input
              placeholder="days"
              type="number"
              required
              name="menstrualPeriodFlowLength"
              value={formik.values.menstrualPeriodFlowLength}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.menstrualPeriodFlowLength &&
                  formik.touched.menstrualPeriodFlowLength
                  ? formik.errors.menstrualPeriodFlowLength
                  : null
              }
            />
          </div>
          <br />

          <div className={`${styles.relationship} ${styles.gapme}`}>
            <div className={styles.relationshipInner}>Weight</div>
            <Input
              placeholder="kg/lbs"
              type="text"
              required
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.weight && formik.touched.weight
                  ? formik.errors.weight
                  : null
              }
            />
          </div>
          <br />

          <div className={`${styles.relationship} ${styles.gapme}`}>
            <div className={styles.relationshipInner}>Height</div>
            <Input
              placeholder="cm/mm"
              type="text"
              required
              name="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.height && formik.touched.height
                  ? formik.errors.height
                  : null
              }
            />
          </div>
          <br />
          <br />

          <div className={styles.buttons}>
            <Button
              type="submit"
              hg="50px"
              color="primary"
              className={styles.presBtn}
              disabled={periodTrackerMutationLoading}
              isLoading={periodTrackerMutationLoading}
            >
              Save details
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PeriodTracker
