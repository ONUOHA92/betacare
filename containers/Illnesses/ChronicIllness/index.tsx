import Input from 'components/Input'
import BlankCardModal from 'components/BlankCardModal'
import Button from 'components/Button'
import React, { useState } from 'react'
import styles from './style.module.css'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Stack from '@mui/material/Stack'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import {
  CHRONIC_ILLNESS_TYPE,
  CHRONIC_ILLNESS_TYPE_DASHED,
} from 'constants/constants'
import { getIllnessBasedOnType } from 'utils/getIllnessBasedOnType'
import { useUpdateUserIllness } from 'network/ReactQuery/Mutations/Profile/useUpdateUserIllness'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IProfileIllness } from 'interface/profile'
import moment from 'moment'

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
  const savedData = getIllnessBasedOnType(illness, CHRONIC_ILLNESS_TYPE_DASHED)
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

  const { userProfileIllnessMutation, profileIllnessUpdateLoading } =
    useUpdateUserIllness()

  const validationSchema = Yup.object({
    details: Yup.string().required('details cannot be empty'),
  })

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      details: savedData?.currentMedicationDetails,
    },
    onSubmit: (values: IProfileIllness) => {
      const newCredentials: any = {
        illnessType: CHRONIC_ILLNESS_TYPE,
        details: values.details,
        dateOfDiagnosis: moment(value).format('DD-MM-YYYY'),
        severity: 'MID', //default
      }

      userProfileIllnessMutation
        .mutateAsync(newCredentials)
        .then(() => refetch())
        .catch((err) => console.log(err))
    },
  })

  return (
    <>

      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'560px'}
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
