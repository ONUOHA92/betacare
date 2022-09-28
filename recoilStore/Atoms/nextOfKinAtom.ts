import { atom } from 'recoil'
import { nextOfKinCredential, nextOfKin } from '../initialState/nextofkin'
import { GET_NEXT_OF_KIN, GET_ONE_NEXT_OF_KIN } from 'network/config/queryKeys'

export const getNextOfKinAtom = atom({
  key: GET_NEXT_OF_KIN,
  default: { ...nextOfKinCredential },
})

export const getOneNextOfKinAtom = atom({
  key: GET_ONE_NEXT_OF_KIN,
  default: { ...nextOfKin },
})
