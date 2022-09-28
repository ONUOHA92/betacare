import Image from 'next/image'
import Button from 'components/Button'

const AdminDoctorDoc = ({ handleClose, file }) => {
  return (
    <div className="wrapper">
      <div className="close"></div>
      <Image src={file} alt={'large doc format'} width={300} height={350} />

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
          height: 333px;
          position: relative;
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
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 300;
          font-size: 12px;
          line-height: 18px;
          display: flex;
          align-items: center;
          color: #848181;
        }
        .imgContainer {
          margin-top: 22px;
          margin-bottom: 44px;
          margin-left: -4rem;
        }
        .close {
          align-self: flex-end;
          cursor: pointer;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  )
}

export default AdminDoctorDoc
