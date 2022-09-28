export interface IBankAccount {
  bankName: string
}

export interface IAccountDetails {
  status: boolean
  message: string
  accountNumber: string
  accountName: string
}

export interface BankDetails {
  bankName: string
  accountNumber: string
  accountName: string
}

export interface IVerifyBankDetails {
  bankName: string
  accountNumber: string
}
