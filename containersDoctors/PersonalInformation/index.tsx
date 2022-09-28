import Input from 'componentsDoctors/Input'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from 'componentsDoctors/Button'
import { Alert, Stack } from '@mui/material'
import Image from 'next/image'

import { IUpdateDoctorProfile } from 'interface/doctor'
import { useUploader } from 'network/ReactQuery/Mutations/Auth/useUploadfiles'
import { useUpdateDoctorProfile } from 'network/ReactQuery/Mutations/Profile/useUpdateDoctorProfile'

type ProfileProps = {
  profile: any
  refetchDoctorProfile: () => void
}

const PersonalInformation = ({
  profile,
  refetchDoctorProfile,
}: ProfileProps) => {
  const [imageData, setImageData] = useState(null)
  const doctorProfile = profile?.data
  const profilePics = doctorProfile?.profilePics
  const { filesUploadMutation, isUploadingFile } = useUploader()
  const { updateDoctorProfile, isUpdatingDoctorProfile, isSuccess, isError } =
    useUpdateDoctorProfile()
  const formik = useFormik({
    initialValues: {
      firstName: doctorProfile?.firstName ?? '',
      lastName: doctorProfile?.lastName ?? '',
      displayName: doctorProfile?.firstName ?? '',
      gender: doctorProfile?.gender ?? 'FEMALE',
    },
    onSubmit: async (values: IUpdateDoctorProfile) => {
      console.log('Form data', values)
      let dp
      try {
        dp = await filesUploadMutation.mutateAsync([
          uploadSingleImage(imageData?.src, 'dp'),
        ])
        console.log(values)
      } catch (error) {
        setTimeout(async () => {
          dp = await filesUploadMutation.mutateAsync([
            uploadSingleImage(imageData?.src, 'dp'),
          ])
        }, 1000)
      }
      const credentials = {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        imageUrl: dp[0]?.data?.secure_url,
      }
      console.log(credentials, 'credentails')

      if (imageData) {
        updateDoctorProfile(credentials)
        setTimeout(() => {
          refetchDoctorProfile()
        }, 1000)
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Firstname cannot be empty'),
      lastName: Yup.string().required('Lastname cannot be empty'),
      displayName: Yup.string().required('Display name cannot be empty'),
      gender: Yup.string().required('Gender cannot be empty'),
    }),
  })
  const onFileLoad = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageData({
        src: e.target.result,
        file,
      })
    }
    reader.readAsDataURL(file)
  }
  const uploadSingleImage = (file, type) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'doctor_folder')

    return formData
  }

  const { setFieldValue } = formik
  useEffect(() => {
    if (profile) {
      setFieldValue('firstName', doctorProfile.firstName)
      setFieldValue('lastName', doctorProfile.lastName)
      setFieldValue('displayName', doctorProfile.firstName)
      setFieldValue('gender', doctorProfile.gender)
    }
  }, [doctorProfile, profile, setFieldValue])

  let imageUrl: string
  if (!imageData) {
    imageUrl = profilePics
  } else if (imageData) {
    imageUrl = imageData?.src
  }
  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {isError && (
          <Alert severity="error">{isError || 'Something went wrong'}</Alert>
        )}
        {isSuccess && (
          <Alert severity="success">
            Personal information updated successfully.
          </Alert>
        )}
      </Stack>

      <div className={styles.formContainer}>
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTop}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="display picture"
                width={144}
                height={144}
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <svg
                width="144"
                height="144"
                viewBox="0 0 144 144"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="72" cy="72" r="72" fill="#C4C4C4" />
              </svg>
            )}

            <>
              <label
                htmlFor="imageUrl"
                className={styles.presBtn2}
                style={{ cursor: 'pointer' }}
              >
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.875 4.44723H8.60703V12.3761C8.60703 12.4793 8.69141 12.5636 8.79453 12.5636H10.2008C10.3039 12.5636 10.3883 12.4793 10.3883 12.3761V4.44723H12.125C12.282 4.44723 12.3687 4.26677 12.2727 4.14489L9.64766 0.821453C9.63012 0.799042 9.60771 0.780918 9.58212 0.768454C9.55654 0.755989 9.52846 0.749512 9.5 0.749512C9.47154 0.749512 9.44346 0.755989 9.41788 0.768454C9.39229 0.780918 9.36988 0.799042 9.35234 0.821453L6.72734 4.14255C6.63125 4.26677 6.71797 4.44723 6.875 4.44723ZM18.0781 11.673H16.6719C16.5688 11.673 16.4844 11.7574 16.4844 11.8605V15.4699H2.51562V11.8605C2.51562 11.7574 2.43125 11.673 2.32812 11.673H0.921875C0.81875 11.673 0.734375 11.7574 0.734375 11.8605V16.5011C0.734375 16.916 1.06953 17.2511 1.48438 17.2511H17.5156C17.9305 17.2511 18.2656 16.916 18.2656 16.5011V11.8605C18.2656 11.7574 18.1812 11.673 18.0781 11.673Z"
                    fill="#1F56C3"
                  />
                </svg>
                Upload
              </label>
              <input
                accept="image/png, image/gif, image/jpeg"
                id="imageUrl"
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onDrop={(e) => {
                  onFileLoad(e)
                }}
                onChange={(e) => {
                  onFileLoad(e)
                }}
                type="file"
                style={{ display: 'none' }}
              />
            </>
          </div>

          <Input
            label="First name"
            placeholder="Teejay"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            disabled
          />

          <br />

          <Input
            label="Last name"
            placeholder="Teko"
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            disabled
          />

          <br />

          <Input
            label="Display name"
            placeholder="Teko"
            id="displayName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            disabled
          />

          <br />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <span className={styles.gender}>Gender</span>
              <span className={styles.asterisk}>*</span>
            </FormLabel>
            <div className={`${styles.envelopeMain}`}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                id="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <div className={`${styles.envelopeMain}`}>
                  <div
                    className={`${styles.envelope} ${formik.values.gender === 'FEMALE'
                      ? styles.activeRadio
                      : ''
                      }`}
                  >
                    {' '}
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio />}
                      label="Female"
                    />
                  </div>
                  <br />
                  <div
                    className={`${styles.envelope} ${formik.values.gender === 'MALE' ? styles.activeRadio : ''
                      }`}
                  >
                    {' '}
                    <FormControlLabel
                      value="MALE"
                      control={<Radio />}
                      label="Male"
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
          </FormControl>
          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn}
            isLoading={isUpdatingDoctorProfile || isUploadingFile}
          >
            Edit profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default PersonalInformation
