import { atom } from 'recoil'
import { doctoesProfileCredential } from '../initialState/doctorsprofile'
import { GET_DOCTOR_PROFILE_KEY } from 'network/config/queryKeys'

export const getDoctorsProfileAtom = atom({
  key: GET_DOCTOR_PROFILE_KEY,
  default: { ...doctoesProfileCredential },
})
