import Input from 'components/Input'
import BlankCardModal from 'components/BlankCardModal'
import Button from 'components/Button'
import EmergencyCardKin from 'containers/EmergencyCardKin'
import React, { useEffect } from 'react'
import styles from './style.module.css'
import { useGetSubUser } from 'network/ReactQuery/Queries/Subuser/useSubUser'
import { useAddSubUser } from 'network/ReactQuery/Mutations/Subuser/useSubUser'
import { useGetSubscription } from 'network/ReactQuery/Queries/Subscription/useSubscription'
import * as Yup from 'yup'
import { IAddSubUser } from 'interface/subuser'
import { useFormik } from 'formik'
import { toast, ToastContainer } from 'react-toastify'

const EmergencyContact = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { subUsers, refetchSubUsers } = useGetSubUser()

  const { addSubUser, subUserLoading, subUserSuccess, subUserMutation } =
    useAddSubUser()
  const { currentSubscription } = useGetSubscription()

  const validationSchema = Yup.object({
    firstName: Yup.string().required('FirstName cannot be empty'),
    lastName: Yup.string().required('LastName cannot be empty'),
    phoneNumber: Yup.string().required('PhoneNumber cannot be empty'),
    email: Yup.string()
      .email('Must be valid email')
      .required('Must be valid email'),
  })

  const restrictUserBasedOnPlan = async (values: IAddSubUser) => {
    if (
      currentSubscription &&
      currentSubscription?.planType === 'FAMILY' &&
      subUsers?.subUsers?.length < 5
    ) {
      await subUserMutation.mutateAsync(values).then(() => refetchSubUsers())
    } else {
      toast.error(
        'Make sure you are on the Family plan and have not added up to 5 subusers'
      )
    }
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    onSubmit: async (values: IAddSubUser, { resetForm }) => {
      await restrictUserBasedOnPlan(values)
    },
  })

  useEffect(() => {
    if (subUserSuccess) {
      handleClose()
    }
  }, [subUserSuccess])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BlankCardModal
        open={open}
        handleClose={handleClose}
        wd={'661px'}
        hg={'630px'}
      >
        <form
          className={styles.formContainerForm}
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formTopp}></div>
          <div className={styles.topText}>
            Please fill the form to add new sub users
          </div>

          <br />
          <Input
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
          <Input
            type="email"
            styleName={styles.input}
            placeholder="Enter email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null
            }
          />
          <br />
          <Input
            type="text"
            styleName={styles.input}
            placeholder="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.phoneNumber && formik.touched.phoneNumber
                ? formik.errors.phoneNumber
                : null
            }
          />
          <br />
          <br />
          <Button
            type="submit"
            hg="50px"
            color="primary"
            className={styles.presBtn}
            isLoading={subUserLoading}
            disabled={subUserLoading}
          >
            Save
          </Button>
        </form>
      </BlankCardModal>
      <div className={styles.formContainer}>
        <div className={styles.formContainerForm}>
          <div className={styles.header} onClick={handleOpen}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.75 1.125C9.75 0.826631 9.63147 0.540483 9.42049 0.329505C9.20952 0.118526 8.92337 0 8.625 0C8.32663 0 8.04048 0.118526 7.8295 0.329505C7.61853 0.540483 7.5 0.826631 7.5 1.125V7.5H1.125C0.826631 7.5 0.540483 7.61853 0.329505 7.8295C0.118526 8.04048 0 8.32663 0 8.625C0 8.92337 0.118526 9.20952 0.329505 9.42049C0.540483 9.63147 0.826631 9.75 1.125 9.75H7.5V16.125C7.5 16.4234 7.61853 16.7095 7.8295 16.9205C8.04048 17.1315 8.32663 17.25 8.625 17.25C8.92337 17.25 9.20952 17.1315 9.42049 16.9205C9.63147 16.7095 9.75 16.4234 9.75 16.125V9.75H16.125C16.4234 9.75 16.7095 9.63147 16.9205 9.42049C17.1315 9.20952 17.25 8.92337 17.25 8.625C17.25 8.32663 17.1315 8.04048 16.9205 7.8295C16.7095 7.61853 16.4234 7.5 16.125 7.5H9.75V1.125Z"
                fill="black"
              />
            </svg>
            Add new
          </div>
          {subUsers?.subUsers?.map((user) => (
            <EmergencyCardKin
              key={user.id}
              nextOfKin={false}
              name={`${user.firstName} ${user.lastName}`}
              userId={user?.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EmergencyContact
