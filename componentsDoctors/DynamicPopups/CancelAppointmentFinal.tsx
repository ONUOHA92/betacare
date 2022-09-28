import Button from 'componentsDoctors/Button'
import Image from 'next/image'
import { useEffect } from 'react'
import { useGetDoctorRequestAppoint } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsRequestAppount'
import { useSetDoctorAppointmentStatus } from 'network/ReactQuery/Mutations/Appointment/updateAppoinmentStatus'

const CardAppointmentFinal = ({ closeAllModal, title, value }) => {
  const { doctorsrequest } = useGetDoctorRequestAppoint()
  const requestedAppointments = doctorsrequest?.data
  const id = requestedAppointments?.content[0].id
  const { setDoctorAppointmentStatus } = useSetDoctorAppointmentStatus()

  const handleStatusUpdate = () => {
    const credentials = {
      appointmentId: id,
      status: 'rejected',
      reason: value,
    }
    // console.log(credentials)
    setDoctorAppointmentStatus(credentials)
    // closeAllModal()
  }
  return (
    <div className="wrapper">
      <p className="title">{title ? 'Decline' : 'Cancel'} Appointment</p>
      <p className="small">
        Kindly note, declining of appointments costs a fee of N5,000
      </p>
      <div className="buttonFlex">
        <Button
          color="neutral"
          wd="190px"
          hg="52px"
          className="btn1"
          onClick={() => closeAllModal()}
        >
          Back
        </Button>
        <Button
          color="primary"
          wd="190px"
          hg="52px"
          className="btn2"
          onClick={handleStatusUpdate}
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
