import Input from 'components/Input'
import React, { useEffect, useRef, useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import styles from './style.module.css'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from 'components/Button'
import { useUpdateUserProfile } from 'network/ReactQuery/Mutations/Profile/useUpdateUserProfile'
import { useProfile } from 'network/ReactQuery/Queries/Profile/useProfile'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { IProfileUpdate } from 'interface/profile'
import Compressor from 'compressorjs'
import cleanBytes from 'utils/cleanbytes'
import { NameBlob } from 'interface/utility'
import Axios from 'axios'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { profilePictureAtom } from 'recoilStore/Atoms/profilePictureAtom'

const PersonalInformation = () => {
  const FILE_SIZE = 3145728 //3MB Max.
  let fileInput1 = useRef(null)
  const radio1 = useRef(null)
  const radio2 = useRef(null)
  const [imageData, setImageData] = useState(null)
  const [disableAll, setDisableAll] = useState(false)
  const [tempImg, setTempImg] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [disableUpload, setDisableUpload] = useState(true)
  const { userProfile, refetchUserProfile } = useProfile()
  const { userProfileMutation, profileUpdateLoading, profileUpdateSuccess } =
    useUpdateUserProfile()

  const [value, setValue] = React.useState<Date | null>(
    userProfile?.dateOfBirth
  )

  const [male, setMale] = useState(false)
  const [female, setFemale] = useState(true)
  const [imageUrl, setImageUrl] = useRecoilState(profilePictureAtom)

  useEffect(() => {
    if (userProfile?.gender === 'MALE') {
      setMale(true)
      radio2?.current?.click()
      setFemale(false)
      setDisableAll(true)
    } else {
      setFemale(true)
      radio1?.current?.click()
      setMale(false)
      setDisableAll(true)
    }
  }, [])

  useEffect(() => {
    if (userProfile?.profilePics) {
      setTempImg(userProfile?.profilePics)
    }
  }, [userProfile])

  useEffect(() => {
    if (profileUpdateSuccess) {
      setUploading(false)
    }
  }, [profileUpdateSuccess])

  const triggerActiveness = (type) => {
    if (type === 'male') {
      setFemale(false)
      setMale(true)
    }

    if (type === 'female') {
      setFemale(true)
      setMale(false)
    }
  }

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  const clearImage = () => {
    /* @ts-ignore */
    formik.setFieldValue('imageUrl', '')(fileInput1 as any).value = ''
    setImageData(null)
  }

  const onFileLoad = async (e) => {
    e.preventDefault()
    const original_file = e.currentTarget.files[0]
    gettempImg(original_file, (imageUrl: string) => {
      setTempImg(imageUrl)
      setDisableUpload(false)
    })
    try {
      new Compressor(original_file, {
        quality: 0.6,
        success: (file) => {
          if (!file) {
            clearImage()
          }
          if (file?.size > FILE_SIZE) {
            setUploading(false)
            toast.error('Image size should not be greater than 3MB')
            clearImage()
            return
          } else {
            try {
              setImageData({
                name: (file as NameBlob)?.name,
                src: file,
                size: cleanBytes(file?.size),
              })
            } catch (err) {
              setUploading(false)
              toast.error('Unable to upload image. Try again.')
              setImageData(null)
            }
          }
        },
      })
    } catch (err) {
      setUploading(false)
      toast.error('Please upload again')
    }
  }

  const uploadSingleImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'patient_image_folder')
    try {
      const upload = await Axios.post(
        'https://api.cloudinary.com/v1_1/nxttech/image/upload',
        formData
      )
      return upload?.data?.secure_url
    } catch (err) {
      setUploading(false)
      toast.error('Network connection seems slow at the moment.')
      return
    }
  }

  const handleProfileUpload = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setUploading(true)
    uploadSingleImage(imageData?.src).then(async (data) => {
      if (data) {
        await userProfileMutation.mutateAsync({
          imageUrl: data,
        })
        refetchUserProfile()
        setImageUrl({
          image: data,
        })
      }
    })
  }

  const gettempImg = (
    img: File,
    callback: (result: string | ArrayBuffer) => void
  ) => {
    const reader = new FileReader()
    try {
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    } catch (err) {
      console.log(err)
    }
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('FirstName cannot be empty'),
    lastName: Yup.string().required('LastName cannot be empty'),
  })

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
    },
    onSubmit: async (values: IProfileUpdate) => {
      const newCredentials = {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: male ? 'male' : 'female',
      }
      await userProfileMutation.mutateAsync(newCredentials)
    },
  })

  return (
    <>
      <div className={styles.formContainer}>
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTop}>
            <div onClick={() => fileInput1?.current?.click()}>
              {!tempImg ? (
                <svg
                  width="144"
                  height="144"
                  viewBox="0 0 144 144"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    cursor: 'pointer',
                    objectFit: 'cover',
                  }}
                >
                  <circle cx="72" cy="72" r="72" fill="#C4C4C4" />
                </svg>
              ) : (
                <Image
                  src={tempImg}
                  alt="profile image"
                  width="144"
                  height="144"
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                />
              )}
              <Typography sx={{
                color: 'info.light',
                marginBottom: '-5px',
                textAlign: 'center'

              }}>click on the image </Typography>
            </div>

            <input
              type="file"
              ref={fileInput1}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => onFileLoad(e)}
              onChange={(e) => onFileLoad(e)}
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
            />

            <Button
              type="button"
              wd="50px"
              hg="50px"
              color="secondary"
              className={styles.presBtn2}
              isLoading={uploading || profileUpdateLoading}
              disabled={disableUpload || uploading || profileUpdateLoading}
              onClick={(e) => handleProfileUpload(e)}
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
            </Button>
          </div>
          <Input
            label="First name"
            type="text"
            styleName={styles.input}
            placeholder="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.firstName && formik.touched.firstName
                ? formik.errors.firstName
                : null
            }
          />
          <br />
          <Input
            label="Last name"
            type="text"
            styleName={styles.input}
            placeholder="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.lastName && formik.touched.lastName
                ? formik.errors.lastName
                : null
            }
          />
          <br />
          <div className={styles.label}> Date of birth </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
                disabled
              />
            </Stack>
          </LocalizationProvider>
          <br />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <span className={styles.gender}>Gender</span>
              <span className={styles.asterisk}>*</span>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <div className={`${styles.envelopeMain}`}>
                <div className={`${styles.envelope}`}>
                  {' '}
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        onChange={() => triggerActiveness('female')}
                        ref={radio1}
                        disabled={disableAll}
                      />
                    }
                    label="Female"
                  />
                </div>
                <br />
                <div className={`${styles.envelope}`}>
                  {' '}
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        onChange={() => triggerActiveness('male')}
                        ref={radio2}
                        disabled={disableAll}
                      />
                    }
                    label="Male"
                  />
                </div>
              </div>
            </RadioGroup>
          </FormControl>
          <br />
          <Input
            label="Identification number"
            placeholder={userProfile?.identificationNo}
            className={styles.disabled}
            disabled
          />
          <Button
            type="submit"
            hg="50px"
            color="secondary"
            className={styles.presBtn}
            isLoading={profileUpdateLoading}
            disabled={profileUpdateLoading}
          >
            Edit profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default PersonalInformation
