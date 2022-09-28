export interface ISubUser {
  subUsers: SubUserElement[]
}

export interface SubUserElement {
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  subUser: SubUserSubUser
}

export interface SubUserSubUser {
  id: number
  email: string
  activated: boolean
  deleted: boolean
  emailVerified: boolean
  imageUrl: string
  resetDate: Date
  otp: string
  verificationOtp: string
  userType: string
  otpCreatedAt: number
  verificationOtpCreatedAt: number
}

export interface IAddSubUser {
  lastName: string
  firstName: string
  email: string
  phoneNumber: string
}
