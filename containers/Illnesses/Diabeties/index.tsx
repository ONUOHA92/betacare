import BlankCardModal from 'components/BlankCardModal'
import Button from 'components/Button'
import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
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
  DIABETES_ILLNESS_TYPE,
  DIABETES_ILLNESS_TYPE_ERROR,
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

const Diabeties = ({
  open,
  handleClose,
  illness,
  refetch,
}: React.PropsWithChildren<Props>) => {
  const savedData = getIllnessBasedOnType(illness, DIABETES_ILLNESS_TYPE)
  const [defaultMethod, setDefaultMethod] = useState('')

  const stateToInitial = () => {
    setType1(false)
    setType2(false)
    setInsulin(false)
    setTablet(false)
  }

  useEffect(() => {
    stateToInitial()
    return () => stateToInitial()
  }, [])

  const handleCloseFinal = () => {
    stateToInitial()
    handleClose()
  }

  const [type1, setType1] = useState(false)
  const [type2, setType2] = useState(false)
  const [insulin, setInsulin] = useState(false)
  const [tablet, setTablet] = useState(false)
  const diabitiesTypes = `${type1 ? 'TYPE1' : ''}  ${type2 ? 'TYPE2' : ''}`
  const medicationTypes = `${insulin ? 'INSULIN' : ''}  ${tablet ? 'DRUG' : ''}`

  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }

  const savedIllnessDate = new Date(moment(savedData?.illnessDate).format())

  const [value, setValue] = React.useState<Date | null>(
    savedData ? savedIllnessDate : new Date()
  )

  const handleChange2 = (newValue: Date | null) => {
    setValue(newValue)
  }

  const { userProfileIllnessMutation, profileIllnessUpdateLoading } =
    useUpdateUserIllness()

  const validationSchema = Yup.object({
    medication: Yup.string().required('medication cannot be empty'),
    details: Yup.string().required('details cannot be empty'),
  })

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      details: savedData?.currentMedicationDetails,
      medication: savedData?.medications,
    },
    onSubmit: (values: IProfileIllness) => {
      const dTypes = diabitiesTypes?.trim()
      const mTypes = medicationTypes?.trim()
      const newCredentials: any = {
        illnessType: DIABETES_ILLNESS_TYPE,
        details: values.details,
        medication: values.medication,
        illnessDuration: moment(value).format('DD-MM-YYYY'),
        diabetesType: dTypes,
        medicationType: mTypes,
        dateOfDiagnosis: moment(value).format('DD-MM-YYYY'),
        isOnMedication: true,
        severity: 'MID', //default
      }

      if (!dTypes || !mTypes) {
        toast.warning(DIABETES_ILLNESS_TYPE_ERROR)
      } else {
        userProfileIllnessMutation
          .mutateAsync(newCredentials)
          .then(() => refetch())
          .catch((err) => console.log(err))
      }
    },
  })

  const handleChackBoxChange = (type: string) => {
    if (type === 'type1') {
      setType1(!type1)
      setType2(false)
    }
    if (type === 'type2') {
      setType2(!type2)
      setType1(false)
    }
  }

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
          <div className={styles.relationshipInner}>
            {' '}
            Are you on Insulin/Tablets ?{' '}
            {savedData && (
              <span className={styles.lessOpaque}>
                (current:{' '}
                {savedData?.medicationType === 'DRUG'
                  ? 'TABLET'
                  : savedData?.medicationType}
                )
              </span>
            )}
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setInsulin(!insulin)}
                  disabled={tablet ? true : false}
                />
              }
              label="Insulin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  onChange={() => setTablet(!tablet)}
                  disabled={insulin ? true : false}
                  sx={{
                    color: 'grey',
                    '&.Mui-checked': {
                      color: '#1F56C3',
                    },
                  }}
                />
              }
              label="Tablet"
            />
          </FormGroup>

          <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
            Diabetics type{' '}
            {savedData && (
              <span className={styles.lessOpaque}>
                (current: {savedData?.diabeticsType})
              </span>
            )}
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleChackBoxChange('type1')}
                  disabled={type2 ? true : false}
                />
              }
              label="Type 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...label}
                  onChange={() => handleChackBoxChange('type2')}
                  disabled={type1 ? true : false}
                  sx={{
                    color: 'grey',
                    '&.Mui-checked': {
                      color: '#1F56C3',
                    },
                  }}
                />
              }
              label="Type 2"
            />
          </FormGroup>
          <div className={styles.stswrapper}>
            <div className={`${styles.relationshipInner} ${styles.gapMe}`}>
              Current medications
            </div>
            <TextField
              multiline={true}
              rows={3}
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
          <div className={styles.mall}>
            How long have you had this illness
          </div>
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

export default Diabeties
