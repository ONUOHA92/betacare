export interface IAddNextOfKin {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  relationship?: string
}

export interface ISuccess {
  message: string
}

export interface INextOfKin {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  relationship?: string
}
