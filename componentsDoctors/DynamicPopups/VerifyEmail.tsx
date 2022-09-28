import Image from 'next/image'
import Button from 'componentsDoctors/Button'
import Link from 'next/link'

const VerifyEmail = ({ handleClose }) => {
  return (
    <div className="wrapper">
      <div className="close"></div>
      <p className="title">Verify Email</p>
      <p className="small">Please verify your email</p>
      <div className="imgContainer">
        <Image
          src="/images/patient/verifiedIcon.svg"
          alt=""
          width="309"
          height="134"
        />
      </div>

      <Link href="/login" passHref>
        <Button disabled={false} type="submit" color="primary" hg="52px">
          Go back to login
        </Button>
      </Link>

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

export default VerifyEmail
