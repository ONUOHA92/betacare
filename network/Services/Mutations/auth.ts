import { ILogin } from '../../../interface/auth'
import { IUpdatePasswordDetails } from '../../../interface/auth'
import api from 'network/config/api'
import Axios from 'axios'
import {
  UPDATE_PASSWORD_ENDPOINT,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
  SIGNUP_ENDPOINT_DOCTOR,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CLOUDINARY_ENDPOINT,
  VERIFY_EMAIL_ENDPOINT,
} from 'network/config/endpoints'

export const updatePasswordService = async (
  payload: IUpdatePasswordDetails
) => {
  const response = await api.post(UPDATE_PASSWORD_ENDPOINT, payload)
  return response
}

export const loginService = async (payload: ILogin) => {
  const response = api.post(LOGIN_ENDPOINT, payload)
  return response
}

export const signUpService = async (payload: any) => {
  const response = api.post(SIGNUP_ENDPOINT, payload)
  return response
}

export const signUpServiceDoctor = async (payload: any) => {
  const response = api.post(SIGNUP_ENDPOINT_DOCTOR, payload)
  return response
}

export const forgotPassword = async (payload: any) => {
  const response = api.post(`${FORGOT_PASSWORD + payload.email}`, payload)
  return response
}

export const resetPassword = async (payload: any) => {
  const response = api.post(RESET_PASSWORD, payload)
  return response
}

export const uploadFileService = async (payload: FormData[]) => {
  const request = payload.map((payload) =>
    Axios.post(CLOUDINARY_ENDPOINT, payload)
  )

  const response = await Axios.all(request)

  return response
}

export const verifyEmailService = async (payload: any) => {
  const response = api.post(VERIFY_EMAIL_ENDPOINT, payload)
  return response
}
