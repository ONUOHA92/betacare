import { atom } from 'recoil'
import {
  GET_DOCTOR_ID,
  DOCTOR_AVAILABILITY_INFO,
} from 'network/config/queryKeys'
import {
  doctorIdCredential,
  doctorAvailabilityCredential,
} from '../initialState/appointment'

export const getDoctorIdAtom = atom({
  key: GET_DOCTOR_ID,
  default: {
    ...doctorIdCredential,
  },
})

export const getDoctorAvailabilityAtom = atom({
  key: DOCTOR_AVAILABILITY_INFO,
})
