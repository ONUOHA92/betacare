export interface IMessage {
  id: number
  message: string
  sender: string
  receiverOnline: boolean
}

export interface IOtherMessage {
  sender: string
  message: string
  id?: number
  receiverOnline?: boolean
}
