import { ISuccess, IGetSubscriptionSuccess } from 'interface/subscription'

export const subscription: ISuccess | null = {
  message: '',
}

export const getSubscription: IGetSubscriptionSuccess | null = {
  message: '',
  status: false,
  subscriptionStatus: '',
  patientEmail: '',
  planType: '',
  transactionType: '',
  transactionStatus: '',
  cancel: false,
}
