import styles from './styles.module.css'
import { useState } from 'react'
import Button from 'components/Button'
import Popups from 'components/Popup'
import Calendar from 'components/Calendar'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Paper from 'components/Paper'
import Input from 'components/Input'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { TextField } from '@mui/material'
//Modified
interface Props {
  wd?: String
  hgt?: String
}

const PurchaseDrugCard = ({ wd, hgt }: React.PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  })

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
  }

  const { gilad, jason, antoine } = state

  const handleClose = () => {
    setOpen(false)
  }

  const methods = ['Scan', 'Test']

  const scanData = ['Scan1', 'Scan2']

  const testData = ['Test1', 'Test2']

  const [defaultMethod, setDefaultMethod] = useState('')
  const [defaultScanMethod, setDefaultScanMethod] = useState('')
  const [defaultTestMethod, setDefaultTestMethod] = useState('')
  const [scan, setScan] = useState(false)
  const [scan1, setScan1] = useState(false)
  const [scan2, setScan2] = useState(false)
  const [Test1, setTest1] = useState(false)
  const [Test2, setTest2] = useState(false)
  const [test, setTest] = useState(false)

  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
    if (event.target.value === 'Test') {
      setScan(false)
      setTest(true)
    } else {
      setTest(false)
      setScan(true)
    }
  }

  const handleScanChange = (event) => {
    setDefaultScanMethod(event.target.value as string)
    if (event.target.value === 'Scan1') {
      setScan2(false)
      setScan1(true)
    } else {
      setScan1(false)
      setScan2(true)
    }
  }

  const handleTestChange = (event) => {
    setDefaultTestMethod(event.target.value as string)
    if (event.target.value === 'Test1') {
      setTest2(false)
      setTest1(true)
    } else {
      setTest1(false)
      setTest2(true)
    }
  }

  const availableTime = ['11.00 am', '12.00 pm', '1.00 pm', '2.00 pm']
  const [defaultAvailableMethod, setDefaultAvailableMethod] = useState(
    availableTime[0]
  )

  const handleAvailableChange = (event) => {
    setDefaultAvailableMethod(event.target.value as string)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headText}>
        Please fill the form to place a request
      </div>
      <div className={styles.form_group}>
        <label>Name</label>
        <Input type={'text'} label="" placeholder="Teejay Teko" />
      </div>
      <div className={styles.form_group}>
        <label>Select Option</label>
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
          style={{ width: '100%', borderRadius: '12px' }}
        >
          {methods?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>

      {scan && (
        <div className={styles.form_group}>
          <label>Select Scan</label>
          <Select
            value={defaultScanMethod}
            onChange={handleScanChange}
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
            displayEmpty
            renderValue={
              defaultScanMethod !== ''
                ? undefined
                : () => <span className={styles.placeholder}>Select one</span>
            }
            style={{ width: '100%', borderRadius: '12px' }}
          >
            {scanData?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}

      {test && (
        <div className={styles.form_group}>
          <label>Select Test</label>
          <Select
            value={defaultTestMethod}
            onChange={handleTestChange}
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
            displayEmpty
            renderValue={
              defaultTestMethod !== ''
                ? undefined
                : () => <span className={styles.placeholder}>Select one</span>
            }
            style={{ width: '100%', borderRadius: '12px' }}
          >
            {testData?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
      <div className={styles.form_group}>
        <label>Price</label>
        <Input type={'text'} placeholder="N12,000.00" />
      </div>
      <div className={styles.form_group}>
        <Calendar />
      </div>
      <div className={styles.form_group}>
        <label>Choose an available time</label>
        <Select
          value={defaultAvailableMethod}
          onChange={handleAvailableChange}
          inputProps={{ 'aria-label': 'Without label' }}
          fullWidth
          displayEmpty
          style={{ width: '100%', borderRadius: '12px' }}
        >
          {availableTime?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.form_group}>
        <label>Address</label>
        <TextField
          type="text"
          name="address"
          multiline
          maxRows={8}
          placeholder="Lagos"
          className={styles.addressHeight}
        />
      </div>
      <Button color="primary" onClick={() => setOpen(true)}>
        Book Appointment
      </Button>

      <Popups isOpen={open} current="bookSuccess" handleClose={handleClose} />
    </div>
  )
}

export default PurchaseDrugCard
