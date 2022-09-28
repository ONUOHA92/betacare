import Input from 'componentsDoctors/Input'
import BlankCardModal from 'componentsDoctors/BlankCardModal'
import BasicTimeLine from 'containersDoctors/BasicTimeLine'
import Button from 'componentsDoctors/Button'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import { MenuItem, Select } from '@mui/material'
import { useGetDocAvailability } from 'network/ReactQuery/Queries/Appointment/doctorAvailability'
import { useSetDoctorAvailability } from 'network/ReactQuery/Mutations/Appointment/doctorAvailability'
import { useDoctorRemoveAvailability } from 'network/ReactQuery/Mutations/Appointment/useDeleteAvailibility'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { DOCTOR_AVAIALABLE_DAYS, DOCTOR_AVAIALABLE_TIME } from 'constants/index'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface WorkTime {
  id: number
  workDay: string
  startWorkTime: string
  endWorkTime: string
}

interface Props {
  open?: boolean
  handleClose?: () => void
}

const SetTimeDate = ({ open, handleClose }: React.PropsWithChildren<Props>) => {
  const { docAvailability, refetch } = useGetDocAvailability()

  const {
    setDoctorAvailability,
    setDoctorAvailabilityMutation,
    setDoctorAvailabilityLoading,
    setDoctorAvailabilitySuccess,
    setDoctorAvailabilityError,
  } = useSetDoctorAvailability()
  const { removeDoctor } = useDoctorRemoveAvailability()

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleChangeBasic = (newValue: Date | null) => {
    setValue(newValue)
  }

  const [newAvailability, setNewAvailability]: any = useState()
  const [newEntries, setNewEntries]: any = useState()
  const [mergedEntries, setMergeEntries] = useState()

  useEffect(() => {
    if (docAvailability) {
      setNewAvailability(docAvailability?.doctorAvailabilities)
    }
  }, [docAvailability])

  const formik = useFormik({
    initialValues: {
      workDay: '',
      startTime: '',
      endTime: '',
    },

    onSubmit: (values) => {
      const data = {
        id: 1234,
        workDay: values.workDay.toUpperCase(),
        startWorkTime: values.startTime,
        endWorkTime: values.endTime,
        type: 'new-entry',
      }
      setNewEntries(data)
    },
    validationSchema: Yup.object({
      workDay: Yup.string().required('Work day is required'),
      startTime: Yup.string().required('Start time is required'),
      endTime: Yup.string().required('End time is required'),
    }),
  })
  const sortDays = function (a, b) {
    const days = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ]
    a = days.indexOf(a.workDay)
    b = days.indexOf(b.workDay)
    return a < b ? -1 : 1
  }

  const retriveDynamicHours = () => {
    if (newAvailability && newEntries) {
      const data = newAvailability?.concat(newEntries)
      return data?.sort(sortDays)
    }
    const data = newAvailability?.sort(sortDays)
    return data
  }

  const removeHandler = () => {
    return setNewEntries(null)
  }

  const removeHandlerById = (doctorsId: number) => {
    removeDoctor(doctorsId).then(() => refetch())
  }

  const handleSave = (e) => {
    e.preventDefault()
    const data = {
      workday: formik.values.workDay.toLowerCase(),
      startWorkTime: formik.values.startTime,
      endWorkTime: formik.values.endTime,
    }
    console.log(data)
    setDoctorAvailability(data)
    setTimeout(() => {
      refetch()
    }, 1000)
    setNewEntries(null)
  }

  return (
    <>
      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'610px'}
      >
        <form
          className={styles.formContainerForm}
          style={{
            padding: '0 10%',
          }}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {setDoctorAvailabilitySuccess && (
              <Alert severity="success">Availability successfully set</Alert>
            )}
            {setDoctorAvailabilityError && (
              <Alert severity="error">Something went wrong</Alert>
            )}
          </Stack>
          <br />
          <div className={styles.topText}>Set your available days and time</div>
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>Select day</div>
            <Select
              id="workDay"
              name="workDay"
              value={formik.values.workDay}
              onChange={formik.handleChange}
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              displayEmpty
              style={{
                width: '100%',
                borderRadius: '6px',
                outline: 'none',
              }}
              className={styles.select}
            >
              {formik.values.workDay === '' && (
                <MenuItem value="">Select one</MenuItem>
              )}
              {DOCTOR_AVAIALABLE_DAYS?.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <br />
          <div className={styles.availableTime}>Select available time</div>
          <div className={styles.flexify}>
            <div className={`${styles.relationship} ${styles.gapme}`}>
              <div className={styles.subHead}>Start</div>
              <div className={styles.limitHeight}>
                {/* <Select
                  id="startTime"
                  name="startTime"
                  value={formik.values.startTime}
                  inputProps={{ 'aria-label': 'Without label' }}
                  fullWidth
                  displayEmpty
                  style={{
                    width: '100%',
                    borderRadius: '6px',
                    outline: 'none',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                  onChange={formik.handleChange}
                >
                  {formik.values.startTime === '' && (
                    <MenuItem value="">Select one</MenuItem>
                  )}

                  {avaialableTime2?.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select> */}

                <select
                  id="startTime"
                  name="startTime"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                >
                  {formik.values.startTime === '' && (
                    <MenuItem value="">Select one</MenuItem>
                  )}

                  {DOCTOR_AVAIALABLE_TIME?.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`${styles.relationship} ${styles.gapme}`}>
              <div className={styles.subHead}>End</div>
              {/* <Select
                id="endTime"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                fullWidth
                displayEmpty
                placeholder="Select one"
                style={{
                  width: '100%',
                  borderRadius: '6px',
                  outline: 'none',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {formik.values.endTime === '' && (
                  <MenuItem value="">Select one</MenuItem>
                )}
                <div className={styles.limitHeight}>
                  {avaialableTime2?.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </div>
              </Select> */}

              {/* <select
                id="endTime"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
              >
                {formik.values.endTime === '' && (
                  <MenuItem value="">Select one</MenuItem>
                )}
                <div className={styles.limitHeight}>
                  {avaialableTime2?.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </div>
              </select> */}

              <select
                id="endTime"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
              >
                {formik.values.startTime === '' && (
                  <MenuItem value="">Select one</MenuItem>
                )}

                {DOCTOR_AVAIALABLE_TIME?.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn2}
          >
            Add
          </Button>
        </form>

        <form className={styles.form2}>
          <div className={styles.top}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0C5.38332 0 0 5.38332 0 12C0 18.6167 5.38332 24 12 24C18.6167 24 24 18.6167 24 12C24 5.38332 18.6167 0 12 0ZM12 22.5C6.2102 22.5 1.50001 17.7898 1.50001 12C1.50001 6.2102 6.2102 1.50001 12 1.50001C17.7898 1.50001 22.5 6.2102 22.5 12C22.5 17.7898 17.7898 22.5 12 22.5V22.5Z"
                fill="#333333"
              />
              <path
                d="M12.75 4.5H11.25V12.3105L15.9697 17.0302L17.0302 15.9697L12.75 11.6894V4.5Z"
                fill="#333333"
              />
            </svg>
            Opening Time
          </div>
          {retriveDynamicHours()?.map((timeframe) => (
            <>
              <BasicTimeLine
                key={timeframe.id}
                day={timeframe.workDay}
                start={timeframe.startWorkTime}
                end={timeframe.endWorkTime}
                removeHandler={removeHandler}
                removeHandlerById={() => removeHandlerById(timeframe.id)}
                entry={timeframe.type}
              />
            </>
          ))}
          <div className={styles.marginTop}>
            <Button
              onClick={(e) => handleSave(e)}
              hg="50px"
              color="primary"
              disabled={setDoctorAvailabilityLoading || !newEntries}
              isLoading={setDoctorAvailabilityLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </BlankCardModal>
    </>
  )
}

export default SetTimeDate
