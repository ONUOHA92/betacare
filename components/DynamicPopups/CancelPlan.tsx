import Button from 'components/Button'
import { useCancelSubscription } from 'network/ReactQuery/Mutations/Subscription/useCancelSubscription'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { patient_routes } from 'utils/routes'

const CancelPlan = ({ handleClose, handleAction }) => {
  const currentRoute = useRouter()

  const { cancelSubscription, subscriptionLoading, subscriptionSuccess } =
    useCancelSubscription()

  const handleMainAction = () => {
    cancelSubscription()
    setTimeout(() => {
      currentRoute.push(patient_routes.PATIENTS_HOME)
    }, 3000)
  }

  useEffect(() => {
    if (subscriptionSuccess) {
      handleAction()
    }
  }, [handleAction, subscriptionSuccess])
  return (
    <>
      <div className="wrapper">
        <div className="close"></div>
        <p className="title">Cancel plan</p>
        <p className="small">
          Are you sure you&apos;d like to cancel this plan?
        </p>
        <div className="imgContainer"></div>
        <div className="btns">
          <Button
            disabled={false}
            color="neutral"
            hg="52px"
            wd="190px"
            onClick={() => handleClose()}
          >
            No
          </Button>
          <Button
            disabled={subscriptionLoading ? true : false}
            type="submit"
            color="primary"
            hg="52px"
            wd="190px"
            onClick={() => handleMainAction()}
            isLoading={subscriptionLoading}
          >
            Yes
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
            height: 210px;
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
            margin-top: 20px;
          }
          .imgContainer {
            margin-top: 22px;
            margin-bottom: 44px;
          }
          .close {
            align-self: flex-end;
            cursor: pointer;
            margin-top: 1.5rem;
          }
          .btns {
            display: flex;
            gap: 54px;
          }
          @media (max-width: 539px) {
            .btns {
              display: flex;
              justify-content: center;
              gap: 20px;
              flex-wrap: wrap;
            }
            .wrapper {
              height: 290px;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default CancelPlan
