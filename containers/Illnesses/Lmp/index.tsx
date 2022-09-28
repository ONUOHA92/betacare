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
import { EMERGENGENCY_RELATIONSHIP_ENUM } from 'constants/constants'

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
  refetch,
}: React.PropsWithChildren<Props>) => {
  const [defaultMethod, setDefaultMethod] = useState('')
  const [defaultMethod2, setDefaultMethod2] = useState('')
  const [defaultMethod3, setDefaultMethod3] = useState('')
  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleChangeBasic = (newValue: Date | null) => {
    setValue(newValue)
  }

  const availableCycle = ['0 - 4', '5 - 10', '10+']
  const avaialableFlow = ['0 - 4', '5 - 10', '10+']

  const handleChange2 = (event) => {
    setDefaultMethod2(event.target.value as string)
  }
  const handleChange3 = (event) => {
    setDefaultMethod3(event.target.value as string)
  }

  return (
    <>
      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'610px'}
      >
        <form className={styles.formContainerForm}>
          <div className={styles.formTopp}></div>
          <div className={styles.topText}>
            Please fill the form to add your medical details
          </div>
          <div className={styles.gapSmall}>LMP (Last Menstrual Period)</div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChangeBasic}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <br />
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>Cycle length</div>
            <Select
              value={defaultMethod2}
              onChange={handleChange2}
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              displayEmpty
              renderValue={
                defaultMethod2 !== ''
                  ? undefined
                  : () => <span className={styles.placeholder}>Select one</span>
              }
              style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
            >
              {availableCycle?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
          <br />

          <div className={`${styles.relationship} ${styles.gapme}`}>
            <div className={styles.relationshipInner}>Flow length</div>
            <Select
              value={defaultMethod3}
              onChange={handleChange3}
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              displayEmpty
              renderValue={
                defaultMethod3 !== ''
                  ? undefined
                  : () => <span className={styles.placeholder}>Select one</span>
              }
              style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
            >
              {avaialableFlow?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
          <br />
          <br />

          <Button
            type="submit"
            hg="50px"
            color="primary"
            className={styles.presBtn}
          >
            Save details
          </Button>
        </form>
      </BlankCardModal>
    </>
  )
}

export default Illness
