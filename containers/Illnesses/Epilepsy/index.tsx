import Input from 'components/Input'
import BlankCardModal from 'components/BlankCardModal'
import Button from 'components/Button'
import EmergencyCard from 'containers/EmergencyCard'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { MenuItem, Select } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Stack from '@mui/material/Stack'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { useUpdateUserIllness } from 'network/ReactQuery/Mutations/Profile/useUpdateUserIllness'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  EPILEPSY_ILLNESS_TYPE,
  ON_MEDICATION_ERROR,
  SEVERITY_ENUM,
} from 'constants/constants'
import { IProfileIllness } from 'interface/profile'
import moment from 'moment'
import { getIllnessBasedOnType } from 'utils/getIllnessBasedOnType'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface Props {
  open?: boolean
  handleClose?: () => void
  illness: []
  refetch: () => void
}

const Illness = ({
  open,
  handleClose,
  illness,
  refetch,
}: React.PropsWithChildren<Props>) => {
  const savedData = getIllnessBasedOnType(illness, EPILEPSY_ILLNESS_TYPE)
  const [defaultMethod, setDefaultMethod] = useState('')
  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }
  const savedIllnessDate = new Date(
    moment(savedData?.diagnosisDate?.join('-')).format('YYYY/M/D')
  )
  const [value, setValue] = React.useState<Date | null>(
    savedData ? savedIllnessDate : new Date()
  )

  const handleChange2 = (newValue: Date | null) => {
    setValue(newValue)
  }

  const [yesMedi, setYesMedi] = useState(false)
  const [noMedi, setNoMedi] = useState(false)

  const stateToInitial = () => {
    setYesMedi(false)
    setNoMedi(false)
  }

  useEffect(() => {
    stateToInitial()
    return () => stateToInitial()
  }, [])

  const handleCloseFinal = () => {
    stateToInitial()
    handleClose()
  }

  const {
    userProfileIllnessMutation,
    profileIllnessUpdateLoading,
    profileIllnessUpdateSuccess,
  } = useUpdateUserIllness()

  const validationSchema = Yup.object({
    medication: Yup.string().required('medication cannot be empty'),
    details: Yup.string().required('details cannot be empty'),
  })

  const [defaultMethodSeverity, setDefaultMethodSeverity] = useState(
    savedData ? savedData?.illnessSeverity : ''
  )
  const handleChangeSeverity = (event) => {
    setDefaultMethodSeverity(event.target.value as string)
  }

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      details: savedData?.currentMedicationDetails,
      medication: savedData?.medications,
    },
    onSubmit: (values: IProfileIllness) => {
      const newCredentials: any = {
        illnessType: EPILEPSY_ILLNESS_TYPE,
        details: values.details,
        medication: values.medication,
        dateOfDiagnosis: moment(value).format('DD-MM-YYYY'),
        isOnMedication: yesMedi ? true : false,
        severity: defaultMethodSeverity,
      }

      if (!yesMedi && !noMedi) {
        toast.warning(ON_MEDICATION_ERROR)
      } else {
        userProfileIllnessMutation
          .mutateAsync(newCredentials)
          .then(() => refetch())
          .catch((err) => console.log(err))
      }
    },
  })

  return (
    <>
      <BlankCardModal
        open={open}
        handleClose={handleCloseFinal}
        wd={'661px'}
        hg={'680px'}
      >
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>
          <div className={styles.topText}>
            Please fill the form to add your medical details
          </div>
          <div className={styles.stswrapper}>
            <br />
            <div className={styles.relationship}>
              <div className={styles.relationshipInner}>Severity</div>
              <Select
                value={defaultMethodSeverity}
                onChange={handleChangeSeverity}
                inputProps={{ 'aria-label': 'Without label' }}
                required
                fullWidth
                displayEmpty
                renderValue={
                  defaultMethodSeverity !== ''
                    ? undefined
                    : () => (
                      <span className={styles.placeholder}>Select one</span>
                    )
                }
                style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
              >
                {SEVERITY_ENUM?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
            Are you on medications?{' '}
            {savedData && (
              <span className={styles.lessOpaque}>
                (current: {savedData?.onMedication ? 'Yes' : 'No'})
              </span>
            )}
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setYesMedi(!yesMedi)}
                  disabled={noMedi ? true : false}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  onChange={() => setNoMedi(!noMedi)}
                  disabled={yesMedi ? true : false}
                  sx={{
                    color: '#1F56C3',
                    '&.Mui-checked': {
                      color: '#1F56C3',
                    },
                  }}
                />
              }
              label="No"
            />
          </FormGroup>
          <div className={styles.stswrapper}>
            <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
              Medication
            </div>
            <TextField
              multiline={true}
              rows={1}
              required
              name="medication"
              value={formik.values.medication}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E5E5',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                },
                '& .MuiInputBase-root': {
                  backgroundColor: '#F9F9FB',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '##E5E5E5',
                  border: '1px solid #E5E5E5',
                },
                '& .MuiInputBase-input': {
                  height: '93px',
                  maxWidth: '100%',
                },
              }}
            />
          </div>
          <div className={styles.stswrapper}>
            <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
              Details
            </div>
            <TextField
              multiline={true}
              rows={3}
              required
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E5E5',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                },
                '& .MuiInputBase-root': {
                  backgroundColor: '#F9F9FB',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '##E5E5E5',
                  border: '1px solid #E5E5E5',
                },
                '& .MuiInputBase-input': {
                  height: '93px',
                  maxWidth: '100%',
                },
              }}
            />
          </div>

          <br />
          <div className={styles.gapSmall}>Date of diagnosis</div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange2}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <br />
          <br />

          <Button
            type="submit"
            hg="50px"
            color="primary"
            className={styles.presBtn}
            disabled={profileIllnessUpdateLoading}
            isLoading={profileIllnessUpdateLoading}
          >
            Save details
          </Button>
        </form>
      </BlankCardModal>
    </>
  )
}

export default Illness
