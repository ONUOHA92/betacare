import { ISuccess, IAddNextOfKin, INextOfKin } from 'interface/nextofkin'

export const nextOfKinSuccess: ISuccess | null = {
  message: '',
}

export const nextOfKinCredential: IAddNextOfKin | null = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  relationship: '',
}

export const nextOfKin: INextOfKin | null = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  relationship: '',
}
