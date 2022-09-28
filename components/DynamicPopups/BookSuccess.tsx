import Image from 'next/image'

const BookSuccess = ({ successText, secondaryText, icon, date = '' }) => {
  return (
    <div className="wrapper">
      <p className="title">{successText}</p>
      <div className="imgContainer">
        <Image src={icon} alt="" width="309" height="134" />
      </div>
      <p className="date">{date}</p>
      <p className="small">{secondaryText}</p>
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
          width: 100%;
          max-width: 203px;
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
          width: 100%;
          max-width: 380px;
        }
      `}</style>
    </div>
  )
}

export default BookSuccess
