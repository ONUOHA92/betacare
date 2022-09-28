import Button from 'components/Button'
import { useCancelAppointment } from 'network/ReactQuery/Mutations/Appointment/useCancelAppointment'
import { useAllDoctorAppointment } from 'network/ReactQuery/Queries/Appointment/useAllAppointment'

const CardAppointmentFinal = ({ closeAllModal, appointmentId, reason }) => {
  const { cancelAppointmentMutation, cancelAppointmentLoading } =
    useCancelAppointment()
  const { refetchAllAppointments } = useAllDoctorAppointment(0)
  const handleCancel = () => {
    const payload = {
      reason: reason,
      appointmentId: appointmentId,
    }
    cancelAppointmentMutation
      .mutateAsync(payload)
      .then(() => {
        closeAllModal()
        refetchAllAppointments()
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="wrapper">
      <p className="title">Cancel Appointment</p>
      <p className="small">
        Kindly note, declining of appointments costs a fee of N5,000
      </p>
      <div className="buttonFlex">
        <Button
          color="neutral"
          wd="190px"
          hg="52px"
          disabled={cancelAppointmentLoading}
          className="btn1"
          onClick={closeAllModal}
        >
          Back
        </Button>
        <Button
          color="primary"
          wd="190px"
          hg="52px"
          className="btn2"
          disabled={cancelAppointmentLoading}
          onClick={handleCancel}
          isLoading={cancelAppointmentLoading}
        >
          OK
        </Button>
      </div>
      <style jsx>{`
        p {
          margin: 0;
        }
        .wrapper {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0;
          align-items: center;
        }
        .title {
          width: 40%;
          color: #333333;
          font-size: 18px;
          line-height: 27px;
          font-weight: 400;
          font-family: Poppins;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 27px;
          color: #000000;
        }
        .buttonFlex {
          display: flex;
          justify-content: space-between;
          gap: 50px;
          margin-top: 42px;
          padding-bottom: 26px;
        }
        .small {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          text-align: center;
          color: #999999;
          margin-top: 24px;
        }
        .btn1 {
          background-color: #ffffff !important;
          border: 1px solid #1f56c3 !important;
        }
      `}</style>
    </div>
  )
}

export default CardAppointmentFinal
