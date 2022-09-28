export interface IClient {
  id: number
  firstName: string
  lastName: string
  email: string
  userType: string
  areaOfSpecialization: string
  profileImage?: string
}

export interface INotifyMsg {
  sender: string | number
  message: string
}

export interface IOtherNotification {
  userId: string | number
  message: string
}

export interface IRefMessage {
  current: Current[]
}

export interface Current {
  id?: number
  message: string
  sender: 'PATIENT' | 'DOCTOR'
  receiverOnline?: boolean
}

export interface IServerSignal {
  status: boolean
  receiver: Receiver
}

export interface Receiver {
  id: string
  userType: string
}
