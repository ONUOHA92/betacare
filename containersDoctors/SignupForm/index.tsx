// @ts-nocheck
import Button from 'componentsDoctors/Button'
import Input from 'componentsDoctors/Input'
import React, { useState, useEffect, useRef } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import styles from './style.module.css'
import Link from 'next/link'
import eye from 'public/images/eye-icon.png'
import mail from 'public/images/icons/email.svg'
import user from 'public/images/icons/user.svg'
import phone from 'public/images/icons/phone.svg'
import lock from 'public/images/icons/lock.svg'
import Microphone from 'public/images/icons/microphone_new.svg'
import Consultation from 'public/images/icons/consultation.svg'
import qualification_new from 'public/images/icons/qualification_new.svg'
import idcard_new from 'public/images/icons/idcard_new.svg'
import doctor_on_cap from 'public/images/icons/doctor_on_cap.svg'
import { Auth } from 'types/authTypes'
import Stack from '@mui/material/Stack'
import { doctorSignUp } from 'recoilStore/initialState/signupdoctor'
import Popups from 'componentsDoctors/Popup'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import Image from 'next/image'
import UploadCredential from 'containersDoctors/UploadCredential'
import cleanBytes from 'utils/cleanbytes'
import moment from 'moment'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import Compressor from 'compressorjs'
import { useSignUpDoctor } from 'network/ReactQuery/Mutations/Auth/useSignUpDoctor'
import { useUploader } from 'network/ReactQuery/Mutations/Auth/useUploadfiles'
import capitalizeInitial from 'utils/capitalizeInitial'
import { patient_routes } from 'utils/routes'
import {
  AREA_OF_SPECIALIZATION,
  AVAILABLE_LANGUAGE,
  AVAILABLE_OPTION,
  QUALIFICATIONS,
  FILE_SIZE,
  DEFAULT_COUNTRY_CODE,
} from '../../constants/index'
import { stylesSelect } from './style'
import MuiPhoneNumber from 'material-ui-phone-number'
import { handlePhoneOnChange } from 'utils/handlePhoneNumberChange'
import { useRouter } from 'next/router'
import { doctorSignupShallowPush } from 'utils/messaging/shallowPush'
import { ROUTES } from 'navigation/routes'


const validationSchema = Yup.object({
  firstName: Yup.string().required('Field cannot be empty'),
  lastName: Yup.string().required('Field cannot be empty'),
  email: Yup.string()
    .email('Must be valid email')
    .required('Must be valid email'),
  password: Yup.string()
    .min(8, 'Password cannot be less than 8 characters')
    .matches(/[a-z]/, 'Password must have lowercase')
    .matches(/[A-Z]/, 'Password must have at least one uppercase')
    .matches(/\d/, 'Password must have numbers')
    .matches(/[a-z]/, 'Password must have lowercase')
    .matches(/[@$!%*#?&]+/, 'Password must have at least one special character')
    .required('Password cannot be empty'),
  qualification: Yup.string(),
})

const SignupForm = () => {
  let fileInput1 = useRef(null)
  let fileInput2 = useRef(null)
  let fileInput3 = useRef(null)
  const [allFilesSelected, setAllFilesSelected] = useState(false)
  const [imageData, setImageData] = useState(null)
  const [imageData1, setImageData1] = useState(null)
  const [imageData2, setImageData2] = useState(null)
  // const [allowDisplay, setAllowDisplay] = useState(false)
  const { signUp, isSigningUp, error, setError, isSuccess } = useSignUpDoctor()
  const { filesUploadMutation, isUploadingFile } = useUploader()
  const [value, setValue] = React.useState<Date | null>(new Date())
  const [male, setMale] = useState(false)
  const [female, setFemale] = useState(true)
  const [generatedPhoneNumber, setGeneratedPhoneNumber] = useState('')

  const triggerActiveness = (type: string) => {
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

  useEffect(() => {
    if (imageData?.src && imageData1?.src && imageData2?.src) {
      setAllFilesSelected(true)
    } else {
      setAllFilesSelected(false)
    }
  }, [imageData, imageData1, imageData2])

  const clearImage = (type: string) => {
    formik?.setFieldValue('image', '')
    if (type === '1') {
      fileInput1.value = ''
      setImageData(null)
    } else if (type === '2') {
      fileInput2.value = ''
      setImageData1(null)
    } else {
      fileInput3.value = ''
      setImageData2(null)
    }
  }

  const onFileLoad = async (e, type) => {
    e.preventDefault()
    const original_file = e.currentTarget.files[0]
    try {
      new Compressor(original_file, {
        quality: 0.6,
        success: (file) => {
          console.log(file)
          if (!file) {
            if (type === 'upload1') {
              clearImage('1')
            } else if (type === 'upload2') {
              clearImage('2')
            } else {
              clearImage('3')
            }
          }
          if (file?.size > FILE_SIZE) {
            setError('Image size should not be greater than 3MB')
            if (type === 'upload1') {
              clearImage('1')
            } else if (type === 'upload2') {
              clearImage('2')
            } else {
              clearImage('3')
            }
            return
          } else {
            try {
              setError('')
              if (type === 'upload1') {
                setImageData({
                  name: file?.name,
                  src: file,
                  size: cleanBytes(file?.size),
                })
              } else if (type === 'upload2') {
                setImageData1({
                  name: file?.name,
                  src: file,
                  size: cleanBytes(file?.size),
                })
              } else {
                setImageData2({
                  name: file?.name,
                  src: file,
                  size: cleanBytes(file?.size),
                })
              }
            } catch (err) {
              setError('Unable to upload image. Try again.')
              if (type === 'upload1') {
                setImageData(null)
              } else if (type === 'upload2') {
                setImageData1(null)
              } else {
                setImageData2(null)
              }
            }
          }
        },
      })
    } catch (err) {
      setError('Please upload again')
    }
  }

  const [visible, setVisible] = useState(false)
  const [defaultMethod2, setDefaultMethod2] = useState('')
  const [specializationMethod, setSpecializationMethod] = useState('')
  const [qualificationMethod, setqualificationMethod] = useState('')

  const handleSpecializationChange = (event: { target: { value: string } }) => {
    setSpecializationMethod(event.target.value as string)
  }

  const handleQualificationChange = (event: { target: { value: string } }) => {
    setqualificationMethod(event.target.value as string)
  }

  const handleChangeLanguage = (event: { target: { value: string } }) => {
    setDefaultMethod2(event.target.value as string)
  }

  const [defaultMethod3, setDefaultMethod3] = useState('')

  const handleChangeConsult = (event: { target: { value: string } }) => {
    setDefaultMethod3(event.target.value as string)
  }

  const [step, setStep] = useState('step1')

  const togglePassword = () => {
    setVisible(!visible)
  }
  const router = useRouter()

  const formik = useFormik({
    validationSchema,
    initialValues: { ...doctorSignUp },
    onSubmit: async (
      values: Auth.SignUpDoctor,
      actions: FormikHelpers<Auth.SignUpDoctor>
    ) => {
      const credentials: Auth.SignUpDoctor = {
        ...values,
        firstName: values.firstName,
        phoneNumber: generatedPhoneNumber,
        platform: 'web',
        qualification: qualificationMethod,
        areaOfSpecialization: specializationMethod,
      }

      if (step === 'step1') {
        setStep('step2')
        doctorSignupShallowPush('2', router)
      } else if (step === 'step2') {
        setStep('step3')
        doctorSignupShallowPush('3', router)
      } else if (step === 'step3') {
        setStep('step4')
        doctorSignupShallowPush('4', router)
      } else {
        await handleFinalSubmission(credentials)
      }
    },
  })

  const uploadSingleImage = (file: string | Blob) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'doctor_folder')

    return formData
  }

  const handleFinalSubmission = async (credentials: Auth.SignUpDoctor) => {
    const files = await filesUploadMutation.mutateAsync([
      uploadSingleImage(imageData?.src, 'cv'),
      uploadSingleImage(imageData1?.src, 'lns'),
      uploadSingleImage(imageData2?.src, 'id'),
    ])

    const cve = files[0]?.data?.secure_url
    const lns = files[1]?.data?.secure_url
    const idc = files[2]?.data?.secure_url

    if (cve && lns && idc) {
      const newData = {
        areaOfSpecialization: credentials.areaOfSpecialization,
        curriculumVitae: cve,
        email: credentials.email,
        firstName: credentials.firstName,
        language: defaultMethod2,
        dateOfBirth: moment(value).format('DD-MM-YYYY'),
        gender: male ? 'male' : 'female',
        lastName: capitalizeInitial(credentials.lastName),
        password: credentials.password,
        phoneNumber: capitalizeInitial(credentials.phoneNumber),
        platform: credentials.platform,
        practiceNumber: credentials.practiceNumber,
        qualification: credentials.qualification,
        validLicense: lns,
        validMeansOfIdentification: idc,
        freeConsultation: defaultMethod3 === 'Yes' ? true : false,
      }
      signUp(newData)
    }
  }

  const currentRoute = useRouter()
  const isSignUpRoute = currentRoute?.pathname === ROUTES.signUp

  useEffect(() => {
    if (isSignUpRoute) {
      if (router?.query?.step === '2') {
        setStep('step2')
      } else if (router?.query?.step === '3') {
        setStep('step3')
      } else if (router?.query?.step === '4') {
        setStep('step4')
      } else {
        setStep('step1')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {isSuccess && <Popups isOpen={isSuccess} current="verifyEmail" />}
      </Stack>
      <h2 className={styles.heading}>Sign Up</h2>
      <div className={styles.flexhead}>
        <span className={styles.heading1}>To Create an Account</span>
        <span className={styles.childflex}>
          Step <span className={styles.color}>{step?.replace('step', '')}</span>{' '}
          of
          <span className={styles.color}>4</span>
        </span>
      </div>
      {step === 'step1' && (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.form}>
            <Input
              type="text"
              styleName={styles.input}
              placeholder="First Name"
              name="firstName"
              icon={user}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.firstName && formik.touched.firstName
                  ? formik.errors.firstName
                  : null
              }
            />
            <Input
              type="text"
              styleName={styles.input}
              placeholder="Last Name"
              name="lastName"
              icon={user}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.lastName && formik.touched.lastName
                  ? formik.errors.lastName
                  : null
              }
            />
            <Input
              type="email"
              styleName={styles.input}
              placeholder="Enter email"
              name="email"
              icon={mail}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null
              }
            />
            <div className={styles.phoneContainer}>
              <MuiPhoneNumber
                defaultCountry={DEFAULT_COUNTRY_CODE}
                onChange={(value: string | number) =>
                  handlePhoneOnChange(value, setGeneratedPhoneNumber)
                }
                className={styles.phoneField}
              />
            </div>

            <br />
            <Input
              type={visible ? 'text' : 'password'}
              styleName={styles.input}
              placeholder="Password"
              name="password"
              icon={lock}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : null
              }
              adornment={eye}
              adornmentAlt="eye"
              onAdornmentClick={togglePassword}
            />

            <Select
              required
              value={defaultMethod2}
              onChange={handleChangeLanguage}
              inputProps={{ 'aria-label': 'Without label' }}
              fullWidth
              displayEmpty
              renderValue={(value) => {
                return (
                  <div className={styles.flex_microphone}>
                    <Image src={Microphone} alt="microphone" />
                    <span className={styles.placeholder}>
                      {value ? value : 'Select language'}
                    </span>
                  </div>
                )
              }}
              style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
            >
              {AVAILABLE_LANGUAGE?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <div className={styles.pushUp}>
              <Select
                required
                value={defaultMethod3}
                onChange={handleChangeConsult}
                inputProps={{ 'aria-label': 'Without label' }}
                fullWidth
                displayEmpty
                renderValue={(value) => {
                  return (
                    <div className={styles.flex_microphone}>
                      <Image src={Consultation} alt="icon" />
                      <span className={styles.placeholder}>
                        {value
                          ? value
                          : 'Do you want to offer free consultations?'}
                      </span>
                    </div>
                  )
                }}
                style={{ width: '100%', borderRadius: '6px', outline: 'none' }}
              >
                {AVAILABLE_OPTION?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <label className={styles.terms}>
              <input type="checkbox" required />I agree to all{' '}
              <div>
                <Link href="/" passHref scroll={false}>
                  Privacy Policy
                </Link>
                ,{' '}
                <Link href="/" passHref scroll={false}>
                  Terms and Conditions
                </Link>
              </div>
            </label>
            <div className={styles.pushDown}>
              <Button disabled={false} type="submit" color="primary">
                Continue
              </Button>
            </div>
            <p className={styles.link}>
              Already have an Account?{' '}
              <Link href={patient_routes.LOGIN} passHref scroll={false}>
                Sign In
              </Link>
            </p>
          </div>
        </form>
      )}

      {step === 'step2' && (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.form}>
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
                  <div
                    className={`${styles.envelope} ${
                      female ? styles.activeRadio : ''
                    }`}
                  >
                    {' '}
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio onChange={() => triggerActiveness('female')} />
                      }
                      label="Female"
                    />
                  </div>
                  <br />
                  <div
                    className={`${styles.envelope} ${
                      male ? styles.activeRadio : ''
                    }`}
                  >
                    {' '}
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio onChange={() => triggerActiveness('male')} />
                      }
                      label="Male"
                    />
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <br />
            <div className={styles.label}> Date of birth </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <br />
            <div className={styles.pushDown}>
              <Button disabled={false} type="submit" color="primary">
                Continue
              </Button>
            </div>
            <p className={styles.link}>
              Already have an Account?{' '}
              <Link href={patient_routes.LOGIN} passHref scroll={false}>
                Sign In
              </Link>
            </p>
          </div>
        </form>
      )}

      {step === 'step3' && (
        <>
          <div className={styles.headerSub}>Enter work information</div>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.form}>
              <Select
                required
                value={qualificationMethod}
                onChange={handleQualificationChange}
                inputProps={{ 'aria-label': 'Without label' }}
                fullWidth
                displayEmpty
                renderValue={(value) => {
                  return (
                    <div className={styles.flex_microphone}>
                      <Image src={qualification_new} alt="qualification" />
                      <span className={styles.placeholder}>
                        {value ? value : 'Qualification e.g FMC'}
                      </span>
                    </div>
                  )
                }}
                style={stylesSelect}
              >
                {QUALIFICATIONS?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <br />
              <br />
              <Input
                type="number"
                required
                styleName={styles.input}
                placeholder="Practice number"
                name="practiceNumber"
                icon={idcard_new}
                value={formik.values.practiceNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.practiceNumber && formik.touched.practiceNumber
                    ? formik.errors.practiceNumber
                    : null
                }
              />
              <Select
                required
                value={specializationMethod}
                onChange={handleSpecializationChange}
                inputProps={{ 'aria-label': 'Without label' }}
                fullWidth
                displayEmpty
                renderValue={(value) => {
                  return (
                    <div className={styles.flex_microphone}>
                      <Image src={doctor_on_cap} alt="microphone" />
                      <span className={styles.placeholder}>
                        {value ? value : 'Area of specialization e.g ENT'}
                      </span>
                    </div>
                  )
                }}
                style={stylesSelect}
              >
                {AREA_OF_SPECIALIZATION?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>

              <div className={styles.pushDown}>
                <Button disabled={false} type="submit" color="primary">
                  Continue
                </Button>
              </div>

              <p className={styles.link}>
                Already have an Account?{' '}
                <Link href={patient_routes.LOGIN} passHref scroll={false}>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </>
      )}
      {step === 'step4' && (
        <>
          <div className={styles.headerSub}>Upload your documents</div>
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={(input) => (fileInput1 = input)}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onDrop={(e) => onFileLoad(e, 'upload1')}
            onChange={(e) => onFileLoad(e, 'upload1')}
            required
            accept="image/png, image/gif, image/jpeg"
            style={{ display: 'none' }}
          />
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={(input) => (fileInput2 = input)}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onDrop={(e) => onFileLoad(e, 'upload2')}
            onChange={(e) => onFileLoad(e, 'upload2')}
            required
            accept="image/png, image/gif, image/jpeg"
            style={{ display: 'none' }}
          />
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={(input) => (fileInput3 = input)}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onDrop={(e) => onFileLoad(e, 'upload3')}
            onChange={(e) => onFileLoad(e, 'upload3')}
            required
            accept="image/png, image/gif, image/jpeg"
            style={{ display: 'none' }}
          />
          <form onSubmit={formik.handleSubmit}>
            <div onClick={() => fileInput1.click()}>
              <UploadCredential title={'CV'} data={imageData} />
            </div>

            <br />
            <div onClick={() => fileInput2.click()}>
              <UploadCredential title={'License'} data={imageData1} />
            </div>
            <br />
            <div onClick={() => fileInput3.click()}>
              <UploadCredential title={'ID'} data={imageData2} />
            </div>

            <div className={styles.form}>
              <div className={styles.pushDown}>
                <Button
                  isLoading={isUploadingFile || isSigningUp}
                  disabled={!allFilesSelected || isUploadingFile || isSigningUp}
                  type="submit"
                  color="primary"
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
      <div className={styles.form}></div>
    </>
  )
}

export default SignupForm
