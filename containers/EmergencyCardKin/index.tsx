import * as React from 'react'
import styles from './style.module.css'
import Button from 'components/Button'
import { useRemoveNextOfKin } from 'network/ReactQuery/Mutations/NextOfKin/useRemoveNextOfKin'
import { useRemoveSubUser } from 'network/ReactQuery/Mutations/Subuser/useSubUser'
import { useGetNextOfKin } from 'network/ReactQuery/Queries/NextOfKin/useNextOfKin'
import { useGetSubUser } from 'network/ReactQuery/Queries/Subuser/useSubUser'

interface Props {
  name: string
  userId: number
  removeBtn?: boolean
  nextOfKin?: boolean
}

const EmergencyCard = ({
  name,
  userId,
  removeBtn,
  nextOfKin,
}: React.PropsWithChildren<Props>) => {
  const { refetchNextOfKin } = useGetNextOfKin()
  const { refetchSubUsers } = useGetSubUser()
  const { nextOfKinRemoveMutation, removeNextOfKinLoading } =
    useRemoveNextOfKin()
  const { removeSubuserMutation, removeSubUserLoading } = useRemoveSubUser()
  const handleRemoveAction = async () => {
    if (nextOfKin) {
      await nextOfKinRemoveMutation
        .mutateAsync(userId)
        .then(() => refetchNextOfKin())
        .catch((err) => console.log(err))
    } else {
      await removeSubuserMutation
        .mutateAsync(userId)
        .then(() => refetchSubUsers())
        .catch((err) => console.log(err))
    }
  }
  const current_state = nextOfKin
    ? removeNextOfKinLoading
    : removeSubUserLoading

  return (
    <div className={styles.smallWell}>
      <span>{name}</span>
      {!removeBtn && (
        <div>
          <Button
            wd="95px"
            hg="39px"
            color="primary"
            className={`${styles.dbtn}`}
            disabled={current_state}
            isLoading={current_state}
            onClick={() => handleRemoveAction()}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

export default EmergencyCard
