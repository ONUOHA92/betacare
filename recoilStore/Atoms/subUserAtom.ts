import { atom } from 'recoil'
import { subUserCredential } from '../initialState/subuser'
import { GET_SUB_USER } from 'network/config/queryKeys'

export const getSubUserAtom = atom({
  key: GET_SUB_USER,
  default: { ...subUserCredential },
})
