import Input from 'componentsDoctors/Input'
import BlankCardModal from 'componentsDoctors/BlankCardModal'
import BasicTimeLine from 'containersDoctors/BasicTimeLine'
import Button from 'componentsDoctors/Button'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { MenuItem, Select, TextField } from '@mui/material'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

interface Props {
  open?: boolean
  handleClose?: () => void
}

const AddNote = ({ open, handleClose }: React.PropsWithChildren<Props>) => {
  const [defaultMethod, setDefaultMethod] = useState('')
  const [defaultMethod2, setDefaultMethod2] = useState('')
  const [defaultMethod3, setDefaultMethod3] = useState('')
  const [defaultMethod4, setDefaultMethod4] = useState('')

  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  )

  const handleChangeBasic = (newValue: Date | null) => {
    setValue(newValue)
  }

  const availableDays = [
    'Monday',
    'Tuesday',
    'Wednessday',
    'Thursday',
    'Friday',
  ]
  const avaialableTime1 = ['8:00am', '9:00am', '1:00pm']
  const avaialableTime2 = ['7:00am', '8:00am', '9:00am', '1:00pm']

  const handleChange2 = (event) => {
    setDefaultMethod2(event.target.value as string)
  }
  const handleChange3 = (event) => {
    setDefaultMethod3(event.target.value as string)
  }
  const handleChange4 = (event) => {
    setDefaultMethod4(event.target.value as string)
  }

  return (
    <>
      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'550px'}
      >
        <form
          className={styles.formContainerForm}
          style={{
            padding: '0 10%',
          }}
        >
          <div className={styles.formTopp}></div>
          <Input placeholder="Title" />
          <br />
          <TextField
            type="text"
            name="about"
            multiline
            maxRows={8}
            placeholder="Type"
            className={styles.aboutHeight}
          />
          <div className={styles.marginTop}>
            <Button type="submit" hg="50px" color="primary">
              Add Note
            </Button>
          </div>
        </form>
      </BlankCardModal>
    </>
  )
}

export default AddNote
