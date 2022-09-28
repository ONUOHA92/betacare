import { atom } from 'recoil'
import { updatePasswordResponse } from '../initialState/doctors'
import { UPDATE_PASSWORD_ATOM } from 'network/config/queryKeys'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const updatePasswordAtom = atom({
  key: UPDATE_PASSWORD_ATOM,
  default: { ...updatePasswordResponse },
  effects_UNSTABLE: [persistAtom],
})
