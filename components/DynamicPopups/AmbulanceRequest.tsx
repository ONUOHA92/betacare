import Image from 'next/image'

const AmbulanceRequest = () => {
  return (
    <div className="wrapper">
      <p className="title">Teejay, you’ve booked an ambulance</p>
      <div className="imgContainer">
        <Image
          src="/images/patient/bookedIcon.svg"
          alt=""
          width="309"
          height="134"
        />
      </div>
      <p className="date">Wednessday, June 1</p>
      <p className="small">
        You will get a notification once your request has been confirmed
      </p>
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
        }
        .date {
          color: #1f56c3;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          text-align: center;
        }
        .small {
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          text-align: center;
          color: #999999;
          width: 70%;
        }
      `}</style>
    </div>
  )
}

export default AmbulanceRequest
