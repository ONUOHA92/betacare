import Button from 'components/Button'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
const Confirmation = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Payment Confirmed! -- Betacare</title>
      </Head>

      <div className="wrapper">
        <div className="innerWrapper">
          <div className="imgContainer">
            <Image
              src="/images/patient/payment-confirmation.svg"
              alt=""
              width="309"
              height="134"
            />
          </div>
          <p className="title">Payment Successful!</p>

          <div>
            <Button
              onClick={() => router.push('/login')}
              isLoading={false}
              disabled={false}
              type="submit"
              color="primary"
              wd="220px"
            >
              Go to Login
            </Button>
          </div>
        </div>
        <style jsx>{`
          p {
            margin: 0;
          }

          .innerWrapper {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            border-radius: 10px;
            width: 100%;
            max-width: 500px;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
          }
          .wrapper {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            position: relative;
          }
          .title {
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
          }
          .close {
            align-self: flex-end;
            cursor: pointer;
            margin-top: 1.5rem;
          }
        `}</style>
      </div>
    </>
  )
}

export default Confirmation
