import React, { useState } from 'react'
import stylelor from './style.module.css'
import Button from 'componentsDoctors/Button'
import BlankCardModal from 'components/BlankCardModal'
import DoctorDocument from 'components/DoctorDocument'
import Popups from 'components/Popup'
import { useSetDoctorSignupStatus } from 'network/ReactQuery/Mutations/Admin/doctorSignupStatus'
import Svg from 'components/Line'

type RequestDetailProps = {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  doctorDetails: any
}
const RequestDetail = ({
  openModal,
  setOpenModal,
  doctorDetails,
}: RequestDetailProps) => {
  const [open, setOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [fileUrl, setFileUrl] = useState('')

  const handleClick = (file) => {
    setOpen(true)
    setFileUrl(file)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const { setDoctorSignupStatus } = useSetDoctorSignupStatus()

  const setStatus = () => {
    setDoctorSignupStatus({
      doctorId: doctorDetails?.body?.id,
      action: 'accept',
    })
  }
  return (
    <>
      <BlankCardModal hg="890px" wd="1037px" open={openModal}>
        <div className={stylelor.firstContainer}>
          <Svg
            width="16"
            height="15"
            fill="none"
            viewBox="0 0 16 15"
            onClick={handleCloseModal}
            d="M15 6.00125H3.14L6.77 1.64125C6.93974 1.43704 7.0214 1.17375 6.99702 0.909329C6.97264 0.644902 6.84422 0.400991 6.64 0.231252C6.43578 0.0615137 6.1725 -0.0201482 5.90808 0.0042315C5.64365 0.0286112 5.39974 0.157036 5.23 0.361252L0.23 6.36125C0.196361 6.40898 0.166279 6.45911 0.14 6.51125C0.14 6.56125 0.14 6.59125 0.0700002 6.64125C0.0246737 6.75591 0.000941121 6.87796 0 7.00125C0.000941121 7.12454 0.0246737 7.24659 0.0700002 7.36125C0.0700002 7.41125 0.0699999 7.44125 0.14 7.49125C0.166279 7.54339 0.196361 7.59353 0.23 7.64125L5.23 13.6413C5.32402 13.7541 5.44176 13.8449 5.57485 13.9071C5.70793 13.9694 5.85309 14.0015 6 14.0013C6.23365 14.0017 6.46009 13.9203 6.64 13.7713C6.74126 13.6873 6.82496 13.5842 6.88631 13.4679C6.94766 13.3515 6.98546 13.2242 6.99754 13.0932C7.00961 12.9622 6.99573 12.8302 6.95669 12.7046C6.91764 12.579 6.8542 12.4623 6.77 12.3613L3.14 8.00125H15C15.2652 8.00125 15.5196 7.8959 15.7071 7.70836C15.8946 7.52082 16 7.26647 16 7.00125C16 6.73604 15.8946 6.48168 15.7071 6.29415C15.5196 6.10661 15.2652 6.00125 15 6.00125Z"
            pathFill="black"
          />
          <Svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            onClick={handleCloseModal}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.99971 8.05976L12.4687 13.5303L13.5307 12.4698L8.06021 6.99926L13.5307 1.53026L12.4702 0.468262L6.99971 5.93876L1.53071 0.468262L0.470215 1.53026L5.93921 6.99926L0.470215 12.4683L1.53071 13.5303L6.99971 8.05976Z"
            pathFill="black"
          />
        </div>
        <div className={stylelor.mainWrapper}>
          <div className={`${stylelor.wrapper} ${stylelor.rightBorder}`}>
            <div className={stylelor.basic}>
              <div>Personnel details</div>
              <div>
                <div className={stylelor.flexSpace}>
                  <div>First name</div>
                  <div>{doctorDetails?.body?.firstName}</div>
                </div>
                <div className={stylelor.flexSpace}>
                  <div>Last name</div>
                  <div>{doctorDetails?.body?.lastName}</div>
                </div>
                <div className={stylelor.flexSpace}>
                  <div>Email</div>
                  <div>{doctorDetails?.body?.email}</div>
                </div>
                <div className={stylelor.flexSpace}>
                  <div>Phone number</div>
                  <div>{doctorDetails?.body?.phoneNumber}</div>
                </div>
                <div className={stylelor.flexSpace}>
                  <div>Qualification</div>
                  <div>{doctorDetails?.body?.qualification}</div>
                </div>
                <div className={stylelor.flexSpace}>
                  <div>Practice number</div>
                  <div>{doctorDetails?.body?.practiseNumber}</div>
                </div>
                <div className={stylelor.flexSpace}>
                  <div>Area of specialization</div>
                  <div>{doctorDetails?.body?.speciality}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={stylelor.dasher}>
            <svg
              width="2"
              height="520"
              viewBox="0 0 2 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="731.5"
                x2="1"
                y2="1.43219"
                stroke="#C4C4C4"
                strokeLinecap="round"
                strokeDasharray="5 6"
              />
            </svg>
          </div>
          <div className={stylelor.wrapper}>
            <div className={stylelor.basic}>
              <div>Personnel documents</div>
              <div className={stylelor.documents}>
                <div
                  onClick={() => handleClick(doctorDetails?.body?.validLicense)}
                >
                  <DoctorDocument
                    name="Dr Teko"
                    type="License"
                    file={doctorDetails?.body?.validLicense}
                  />
                </div>
                <div
                  onClick={() =>
                    handleClick(doctorDetails?.body?.validMeansOfIdentification)
                  }
                >
                  <DoctorDocument
                    name="Dr Teko"
                    type="Valid ID"
                    file={doctorDetails?.body?.validMeansOfIdentification}
                  />
                </div>
                <div
                  onClick={() =>
                    handleClick(doctorDetails?.body?.curriculumVitae)
                  }
                >
                  <DoctorDocument
                    name="Dr Teko"
                    type="CV"
                    file={doctorDetails?.body?.curriculumVitae}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={stylelor.largeGap}></div>
        <div className={stylelor.bottomBtn}>
          <Button
            wd="426px"
            hg="50px"
            color="neutral"
            fiantBorder
            className={stylelor.presBtnn2}
            onClick={() => setRejectOpen(true)}
          >
            Reject
          </Button>
          <Button
            wd="426px"
            hg="50px"
            color="primary"
            className={stylelor.presBtnn}
            onClick={(e) => {
              e.preventDefault()
              setStatus()
              setTimeout(() => {
                setOpenModal(false)
              }, 2000)
            }}
          >
            Accept
          </Button>
        </div>
        <Popups
          isOpen={open}
          current="doctorDocument"
          handleClose={() => setOpen(false)}
          file={fileUrl}
        />
        <Popups
          isOpen={rejectOpen}
          current="rejectDoctorRequest"
          handleClose={() => setRejectOpen(false)}
          doctorId={doctorDetails?.body?.id}
          setOpenModal={setOpenModal}
        />
      </BlankCardModal>
    </>
  )
}

export default RequestDetail
