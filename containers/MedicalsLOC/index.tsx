import React, { useEffect, useState } from 'react'
import { Label } from '@mui/icons-material'
import styles from './style.module.css'
import Button from 'components/Button'
import { MenuItem, Select } from '@mui/material'
import Diabeties from 'containers/Illnesses/Diabeties'
import Epilepsy from 'containers/Illnesses/Epilepsy'
import ChronicIllness from 'containers/Illnesses/ChronicIllness'
import Operation from 'containers/Illnesses/Operation'
import Cancer from 'containers/Illnesses/Cancer'
import Lmp from 'containers/Illnesses/Lmp'
import { ALL_ILLNESSES_ENUM } from 'constants/constants'
import { useMedicalIllness } from 'network/ReactQuery/Queries/Profile/useMedicalIllness'

const LOC = () => {
  const [defaultMethod, setDefaultMethod] = useState('')
  const [showDiabieties, setShowDiabieties] = useState(false)
  const [showEpilepsy, setShowEpilepsy] = useState(false)
  const [showChronic, setShowChronic] = useState(false)
  const [showOperation, setShowOperation] = useState(false)
  const [showCancer, setShowCancer] = useState(false)
  const [showPeriodTracker, setPeriodTracker] = useState(false)
  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleOpen()
    if (defaultMethod === 'Diabetes') {
      setShowDiabieties(true)
      setShowEpilepsy(false)
      setShowChronic(false)
      setShowOperation(false)
      setShowCancer(false)
      setPeriodTracker(false)
    } else if (defaultMethod === 'Epilepsy') {
      setShowEpilepsy(true)
      setShowDiabieties(false)
      setShowChronic(false)
      setShowOperation(false)
      setShowCancer(false)
      setPeriodTracker(false)
    } else if (defaultMethod === 'Chronic Illness') {
      setShowChronic(true)
      setShowEpilepsy(false)
      setShowDiabieties(false)
      setShowOperation(false)
      setShowCancer(false)
      setPeriodTracker(false)
    } else if (defaultMethod === 'Operation') {
      setShowOperation(true)
      setShowChronic(false)
      setShowEpilepsy(false)
      setShowDiabieties(false)
      setShowCancer(false)
      setPeriodTracker(false)
    } else if (defaultMethod === 'Cancer') {
      setShowCancer(true)
      setShowOperation(false)
      setShowChronic(false)
      setShowEpilepsy(false)
      setShowDiabieties(false)
      setPeriodTracker(false)
    } else {
      setPeriodTracker(true)
      setShowCancer(false)
      setShowOperation(false)
      setShowChronic(false)
      setShowEpilepsy(false)
      setShowDiabieties(false)
    }
  }

  const [open, setOpen] = React.useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { patientIllnessByType, refetchPatientIllnessByType } =
    useMedicalIllness()

  return (
    <>
      {showDiabieties && (
        <Diabeties
          open={open}
          handleClose={handleClose}
          illness={patientIllnessByType}
          refetch={refetchPatientIllnessByType}
        />
      )}
      {showEpilepsy && (
        <Epilepsy
          open={open}
          handleClose={handleClose}
          illness={patientIllnessByType}
          refetch={refetchPatientIllnessByType}
        />
      )}
      {showChronic && (
        <ChronicIllness
          open={open}
          handleClose={handleClose}
          illness={patientIllnessByType}
          refetch={refetchPatientIllnessByType}
        />
      )}
      {showOperation && (
        <Operation
          open={open}
          handleClose={handleClose}
          illness={patientIllnessByType}
          refetch={refetchPatientIllnessByType}
        />
      )}
      {showCancer && (
        <Cancer
          open={open}
          handleClose={handleClose}
          illness={patientIllnessByType}
          refetch={refetchPatientIllnessByType}
        />
      )}

      <div className={styles.formContainer} onSubmit={handleSubmit}>
        <form className={styles.formContainerForm}>
          <div className={styles.formTop}></div>
          <br />
          <div className={styles.relationship}>
            <Select
              value={defaultMethod}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              displayEmpty
              renderValue={
                defaultMethod !== ''
                  ? undefined
                  : () => <span className={styles.placeholder}>Select one</span>
              }
              style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
            >
              {ALL_ILLNESSES_ENUM?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>

          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn}
          >
            Edit profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default LOC
