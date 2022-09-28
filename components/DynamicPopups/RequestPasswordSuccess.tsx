import Image from 'next/image'
import Button from 'components/Button'
import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { Auth } from 'types/authTypes'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { patient_routes } from 'utils/routes'
import { getWithOutExpiry, removeItem } from 'utils/localStorage'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { useRecoilValue } from 'recoil'
const RequestPasswordSuccess = ({ handleClose, sensitivePassword }) => {
  const { isLoggedIn } = useRecoilValue(userAtom)

  const router = useRouter()

  const handleAuthenticate = (e) => {
    e.preventDefault()
    const credentials: Auth.LoginDetails = {
      email: getWithOutExpiry('otp_step1')?.email || '',
      password: sensitivePassword,
    }
    removeItem('otp_step1')
    router.push(patient_routes.PATIENTS_HOME)
  }

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {isLoggedIn && (
          <Alert severity="success">Redirecting to Dashboard now...</Alert>
        )}
      </Stack>
      <div className="wrapper">
        <div className="close"></div>
        <p className="title">Password Reset Successful</p>
        <div className="imgContainer">
          <Image
            src="/images/patient/password.svg"
            alt=""
            width="309"
            height="134"
          />
        </div>
        <div onClick={(e) => handleAuthenticate(e)}>
          <Button
            isLoading={false}
            disabled={false}
            type="submit"
            color="primary"
            wd="220px"
          >
            Go to Dashboard
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
            height: 318px;
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
            margin-top: 42px;
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
    </>
  )
}

export default RequestPasswordSuccess
