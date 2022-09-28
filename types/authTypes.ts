import { User } from 'types/usersTypes'
export namespace Auth {
  export type State = {
    isAuthenticated: any
    isLoading: boolean
    hasErrored: boolean
    isEmailVerified: boolean
    registrationSuccessful: SignupResponse
    passwordResetSuccessful: boolean
    error: any
    user: User
    registration: ActionResponse
    login: ActionResponse
    verify: ActionResponse
    forgotPassword: ActionResponseExtra
    resetPassword: ActionResponseExtra
  }

  export type ActionResponse = {
    success: boolean
    error: string
    res?: any
  }

  export type LoginResponse = {
    roles?: any
    token?: any
  }

  export type ActionResponseExtra = ActionResponse & {
    isLoading: boolean
  }

  export type SingleEmail = {
    email?: string
  }

  export type PasswordReset = {
    email: string
  }

  export type ConfirmEmail = {
    verificationToken: string
  }

  export type VerifyEmail = {
    verificationToken: string
  }

  export type VerifySuccess = {
    message?: string
  }

  export type NewPassword = {
    newPassword: string
    resetToken: string
  }

  export type LoginDetails = {
    email: string
    password: string
  }

  export type SignupCredentials = {
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    phoneNumber?: string
    gender?: string
    dateOfBirth?: string
    platform?: string
  }

  export interface SignUpDoctor {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string
    language: string
    platform: string
    dateOfBirth?: string
    qualification: string
    practiceNumber: number | string
    areaOfSpecialization: string
    curriculumVitae: string
    validLicense: string
    validMeansOfIdentification: string
    gender: string
    freeConsultation?: string | boolean
  }

  export interface PasswordResetReq {
    otp?: string
    email?: string | any
    newPassword?: string
    confirmPassword?: string
  }

  export type SignupResponse = Omit<SignupCredentials, 'password'>
  export enum ATypes {
    DESTROY = 'DESTROY',

    AUTH_LOGOUT = 'AUTH_LOGOUT',

    REQ_USER = 'REQ_USER',
    RES_USER = 'RES_USER',
    ERR_USER = 'ERR_USER',

    REQ_LOGIN = 'AUTH.REQ_LOGIN',
    RES_LOGIN = 'AUTH.RES_LOGIN',
    ERR_LOGIN = 'AUTH.ERR_LOGIN',

    REQ_SIGNUP = 'AUTH.REQ_SIGNUP',
    RES_SIGNUP = 'AUTH.RES_SIGNUP',
    ERR_SIGNUP = 'AUTH.ERR_SIGNUP',

    REQ_SIGNUP_DOCTOR = 'AUTH.REQ_SIGNUP_DOCTOR',
    RES_SIGNUP_DOCTOR = 'AUTH.RES_SIGNUP_DOCTOR',
    ERR_SIGNUP_DOCTOR = 'AUTH.ERR_SIGNUP_DOCTOR',

    REQ_CONFIRM_EMAIL = 'AUTH.REQ_CONFIRM_EMAIL',
    RES_CONFIRM_EMAIL = 'AUTH.RES_CONFIRM_EMAIL',
    ERR_CONFIRM_EMAIL = 'AUTH.ERR_CONFIRM_EMAIL',

    REQ_VERIFY_EMAIL = 'AUTH.REQ_VERIFY_EMAIL',
    RES_VERIFY_EMAIL = 'AUTH.RES_VERIFY_EMAIL',
    ERR_VERIFY_EMAIL = 'AUTH.ERR_VERIFY_EMAIL',

    REQ_RESET_NEW_PASSWORD = 'AUTH.REQ_RESET_NEW_PASSWORD',
    RES_RESET_NEW_PASSWORD = 'AUTH.RES_RESET_NEW_PASSWORD',
    ERR_RESET_NEW_PASSWORD = 'AUTH.ERR_RESET_NEW_PASSWORD',

    REQ_FORGOT_PASSWORD = 'AUTH.REQ_FORGOT_PASSWORD',
    RES_FORGOT_PASSWORD = 'AUTH.RES_FORGOT_PASSWORD',
    ERR_FORGOT_PASSWORD = 'AUTH.ERR_FORGOT_PASSWORD',

    CHECK_USER_SESSION = 'AUTH_CHECK_USER_SESSION',
    CHECK_USER_SESSION_SUCCESS = 'CHECK_USER_SESSION_SUCCESS',
  }

  // export interface IActionAuth extends Action {
  //   payload: boolean
  //   type: ATypes
  // }
}
