import { atom } from 'recoil'
import { initialDoctorSearch } from '../initialState/doctorSearch'
import { GET_SPECIFIC_DOCTOR_PROFILE } from 'network/config/queryKeys'

export const getDoctorsSearchAtom = atom({
  key: GET_SPECIFIC_DOCTOR_PROFILE,
  default: { ...initialDoctorSearch },
})
