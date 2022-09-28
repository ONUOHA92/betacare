/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import styles from './style.module.css'
import Button from 'componentsDoctors/Button'
import { useRemoveNextOfKin } from 'network/ReactQuery/Mutations/NextOfKin/useRemoveNextOfKin'
import { useGetNextOfKin } from 'network/ReactQuery/Queries/NextOfKin/useNextOfKin'
import { useRecoilState } from 'recoil'
import { getOneNextOfKinAtom } from 'recoilStore/Atoms/nextOfKinAtom'
import { IAddNextOfKin } from 'interface/nextofkin'
interface Props {
  contact: any
  active?: boolean
  handleOpen?: () => void
  userId: number
  getOneNextOfKin?: (id: number) => void
  setSingleNextOfKin?: (nextOfKin: any) => void
  setFormState: React.Dispatch<
    React.SetStateAction<{
      isEditing: boolean
      data: IAddNextOfKin
    }>
  >
}

const EmergencyCard = ({
  active,
  handleOpen,
  setFormState,
  contact,
  userId,
}: React.PropsWithChildren<Props>) => {
  const { nextOfKinRemoveMutation, removeNextOfKinLoading } =
    useRemoveNextOfKin()
  const { refetchNextOfKin } = useGetNextOfKin()
  const handleRemoveAction = async () => {
    await nextOfKinRemoveMutation.mutateAsync(userId)
    refetchNextOfKin()
  }
  const [nextOfKin, setNextOfKin] = useRecoilState(getOneNextOfKinAtom)

  const handleClick = () => {
    setFormState({ isEditing: true, data: { ...contact } })
    handleOpen && handleOpen()
  }

  return (
    <div className={styles.smallWell}>
      <span onClick={handleClick} style={{ cursor: 'pointer' }}>
        {contact.firstName} {contact.lastName}
      </span>
      <div>
        <Button
          wd="95px"
          hg="39px"
          color={active ? 'primary' : 'tertiary'}
          className={`${styles.dbtn}`}
          onClick={() => handleRemoveAction()}
          isLoading={removeNextOfKinLoading}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default EmergencyCard
