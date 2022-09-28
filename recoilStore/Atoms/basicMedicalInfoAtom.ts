import { atom } from 'recoil'
import { GET_BASIC_MEDICAL_INFO } from 'network/config/queryKeys'
import { basicInfo } from 'recoilStore/initialState/basicMedicalInfo'

export const medicalBasicInfoAtom = atom({
  key: GET_BASIC_MEDICAL_INFO,
  default: {
    ...basicInfo,
  },
})
