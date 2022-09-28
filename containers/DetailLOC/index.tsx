import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Button from 'components/Button'
import { MenuItem, Select } from '@mui/material'
import { useUpdateUserMedical } from 'network/ReactQuery/Mutations/Profile/useUpdateUserMedical'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { medicalBasicInfoAtom } from 'recoilStore/Atoms/basicMedicalInfoAtom'
import { useMedicalProfile } from 'network/ReactQuery/Queries/Profile/useMedicalProfile'

const DetailLOC = () => {
  const medicalBasicInfo = useRecoilValue(medicalBasicInfoAtom)
  const { refetchUserMedicalProfile } = useMedicalProfile()
  const {
    updateMedicalProfile,
    userMedicalMutation,
    medicalUpdateLoading,
    medicalUpdateSuccess,
  } = useUpdateUserMedical()

  const availableBloodGroups = ['A', 'B', 'O', 'AB']
  const availableGenotype = ['AA', 'AS', 'SS']
  const [defaultMethod, setDefaultMethod] = useState('')
  const [defaultMethod2, setDefaultMethod2] = useState('')

  const handleChange = (event) => {
    setDefaultMethod(event.target.value as string)
  }
  const handleChange2 = (event) => {
    setDefaultMethod2(event.target.value as string)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (defaultMethod && defaultMethod2) {
      const data = {
        bloodGroup: defaultMethod,
        genotype: defaultMethod2,
        weight: medicalBasicInfo?.weight,
        height: medicalBasicInfo?.height,
        chest: medicalBasicInfo?.chest,
        waist: medicalBasicInfo?.waist,
      }
      userMedicalMutation
        .mutateAsync(data)
        .then(() => refetchUserMedicalProfile())
        .catch((err) => console.log(err))
    } else {
      toast.error('All input fields must be filled.')
    }
  }

  useEffect(() => {
    setDefaultMethod(medicalBasicInfo?.bloodGroup)
    setDefaultMethod2(medicalBasicInfo?.genotype)
  }, [])

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.formContainerForm}>
          <div className={styles.formTop}></div>
          <br />
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>Blood group</div>
            <Select
              value={defaultMethod}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Without label' }}
              required
              fullWidth
              displayEmpty
              renderValue={
                defaultMethod !== ''
                  ? undefined
                  : () => <span className={styles.placeholder}>Select one</span>
              }
              style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
            >
              {availableBloodGroups?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className={`${styles.relationship} ${styles.gapme}`}>
            <div className={styles.relationshipInner}>Genotype</div>
            <Select
              required
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
              {availableGenotype?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>

          <br />
          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn}
            onClick={(e) => handleSubmit(e)}
            isLoading={medicalUpdateLoading}
            disabled={medicalUpdateLoading}
          >
            Edit profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default DetailLOC
