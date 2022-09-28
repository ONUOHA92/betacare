import { atom } from 'recoil'
import { subUserCredential } from '../initialState/subuser'
import {  DARK_THEME_ATOM_KEY } from 'network/config/queryKeys'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const DARK_THEME_ATOM = atom({
  key: DARK_THEME_ATOM_KEY,
  default: {mode:"dark"},
  effects_UNSTABLE: [persistAtom],

})
