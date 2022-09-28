import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import Button from 'components/Button'
import { useUpdateUserMedical } from 'network/ReactQuery/Mutations/Profile/useUpdateUserMedical'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { medicalBasicInfoAtom } from 'recoilStore/Atoms/basicMedicalInfoAtom'
import { useMedicalProfile } from 'network/ReactQuery/Queries/Profile/useMedicalProfile'
import Input from 'components/Input'

const LOC = () => {
  const medicalBasicInfo = useRecoilValue(medicalBasicInfoAtom)
  const { refetchUserMedicalProfile } = useMedicalProfile()
  const { userMedicalMutation, medicalUpdateLoading } = useUpdateUserMedical()

  const [defaultMethod, setDefaultMethod] = useState(0)
  const [defaultMethod2, setDefaultMethod2] = useState(0)
  const [defaultMethod3, setDefaultMethod3] = useState(0)
  const [defaultMethod4, setDefaultMethod4] = useState(0)

  const handleChange = (event: { target: { value: any } }) => {
    setDefaultMethod(event.target.value)
  }
  const handleChange2 = (event: { target: { value: any } }) => {
    setDefaultMethod2(event.target.value)
  }

  const handleChange3 = (event: { target: { value: any } }) => {
    setDefaultMethod3(event.target.value)
  }

  const handleChange4 = (event: { target: { value: any } }) => {
    setDefaultMethod4(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (defaultMethod && defaultMethod2) {
      const data = {
        genotype: medicalBasicInfo?.genotype,
        bloodGroup: medicalBasicInfo?.bloodGroup,
        weight: defaultMethod,
        height: defaultMethod2,
        chest: defaultMethod3,
        waist: defaultMethod4,
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
    setDefaultMethod(medicalBasicInfo?.weight)
    setDefaultMethod2(medicalBasicInfo?.height)
    setDefaultMethod3(medicalBasicInfo?.chest)
    setDefaultMethod4(medicalBasicInfo?.waist)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.formContainerForm}>
          <div className={styles.formTop}></div>
          <br />
          <div className={styles.relationship}>
            <div className={styles.relationshipInner}>
              Weight <span className={styles.unit}>(kg)</span>
            </div>
            <Input
              type="number"
              name="weight"
              onChange={handleChange}
              value={defaultMethod}
            />
          </div>

          <div className={`${styles.relationship} ${styles.gapme}`}>
            <div className={styles.relationshipInner}>
              Height <span className={styles.unit}>(cm)</span>
            </div>

            <Input
              type="number"
              name="height"
              onChange={handleChange2}
              value={defaultMethod2}
            />
          </div>
          <div className={`${styles.relationship} ${styles.gapme}`}>
            <div className={styles.relationshipInner}>
              Chest <span className={styles.unit}>(cm)</span>
            </div>
            <Input
              type="number"
              name="chest"
              onChange={handleChange3}
              value={defaultMethod3}
            />
          </div>
          <div className={`${styles.relationship} ${styles.gapme}`}>
            <div className={styles.relationshipInner}>
              Waist <span className={styles.unit}>(cm)</span>
            </div>

            <Input
              type="number"
              name="waist"
              value={defaultMethod4}
              onChange={handleChange4}
            />
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

export default LOC
