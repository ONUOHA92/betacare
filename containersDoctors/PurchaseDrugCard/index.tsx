import styles from './styles.module.css'
import { useState } from 'react'
import Button from 'componentsDoctors/Button'
import Popups from 'componentsDoctors/Popup'
import Calendar from 'componentsDoctors/Calendar'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Paper from 'componentsDoctors/Paper'
import Input from 'componentsDoctors/Input'
import FormLabel from '@mui/material/FormLabel'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { TextField } from '@mui/material'

//Modified
interface Props {
  wd?: String
  hgt?: String
  enableAppointment?: Function
}

const PurchaseDrugCard = ({
  wd,
  hgt,
  enableAppointment,
}: React.PropsWithChildren<Props>) => {
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

  const handleCTA = () => {
    enableAppointment()
    setOpen(true)
  }

  const methods = ['Home Delivery', 'Pickup']

  const [defaultMethod, setDefaultMethod] = useState('')
  const [homeDelivery, setHomeDelivery] = useState(false)
  const [pickup, setPickup] = useState(false)

  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
    if (event.target.value === 'Home Delivery') {
      setPickup(false)
      setHomeDelivery(true)
    } else {
      setHomeDelivery(false)
      setPickup(true)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headText}>
        Please fill the form to get your drugs
      </div>
      <div className={styles.form_group}>
        <label>Name</label>
        <Input type={'text'} defaultValue={'Teejay Teko'} />
      </div>
      <div className={styles.form_group}>
        <label>Drugs</label>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <div className={styles.form_control}>
                  <Checkbox
                    checked={gilad}
                    onChange={handleCheckBoxChange}
                    name="gilad"
                  />
                  <p>Panadol</p>
                </div>
              }
              sx={{
                '&.MuiFormControlLabel-root': {
                  justifyContent: 'space-between',
                },
              }}
              label="₦500"
            />
            <FormControlLabel
              control={
                <div className={styles.form_control}>
                  <Checkbox
                    checked={jason}
                    onChange={handleCheckBoxChange}
                    name="jason"
                  />
                  <p>Panadol</p>
                </div>
              }
              label="₦500"
              sx={{
                '&.MuiFormControlLabel-root': {
                  justifyContent: 'space-between',
                },
              }}
            />
            <FormControlLabel
              control={
                <div className={styles.form_control}>
                  <Checkbox
                    checked={antoine}
                    onChange={handleCheckBoxChange}
                    name="antoine"
                  />
                  <p>Panadol</p>
                </div>
              }
              label="₦500"
              sx={{
                '&.MuiFormControlLabel-root': {
                  justifyContent: 'space-between',
                },
              }}
            />
          </FormGroup>
        </FormControl>
      </div>
      <div className={styles.form_group}>
        <label>Delivery Method</label>
        <Select
          defaultValue="Select one"
          value={defaultMethod}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          fullWidth
          style={{ width: '100%', borderRadius: '12px' }}
        >
          {methods?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      {pickup && (
        <div className={styles.form_group}>
          <label>Recievers Name</label>
          <Input type={'text'} defaultValue={'Teejay Teko'} />
        </div>
      )}
      {homeDelivery && (
        <div className={styles.form_group}>
          <label>Delivery Address</label>
          <Input type={'text'} defaultValue={'Teejay Teko'} />
        </div>
      )}
      {(homeDelivery || pickup) && (
        <Button color="primary" onClick={() => setOpen(true)}>
          Purchase
        </Button>
      )}
      {!homeDelivery && !pickup && <Button color="primary">Continue</Button>}

      <Popups
        isOpen={open}
        current="purchaseSuccess"
        handleClose={handleClose}
      />
    </div>
  )
}

export default PurchaseDrugCard
