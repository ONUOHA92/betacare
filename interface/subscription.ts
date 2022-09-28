export interface ISubscription {
  subscriptionPlan: string
}

export interface ISuccess {
  message: string
}

export interface IGetSubscriptionSuccess {
  message: string
  status: boolean
  subscriptionStatus: string
  patientEmail: string
  planType: string
  transactionType: string
  transactionStatus: string
  cancel: boolean
}

export interface ICurrentPlan {
  cancel: boolean
  message: string
  patientEmail: string
  planType: string
  status: boolean
  subscriptionStatus: string
  transactionStatus: string
  transactionType: string
}
