import { atom } from 'recoil'
import { credentials } from '../initialState/credentials'
import { USER_ATOM, NOTIFICATION_COUNT_ATOM } from 'network/config/queryKeys'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userAtom = atom({
  key: USER_ATOM,
  default: { ...credentials },
  effects_UNSTABLE: [persistAtom],
})

export const totalNotificationCountAtom = atom({
  key: NOTIFICATION_COUNT_ATOM,
  default: 0,
  effects_UNSTABLE: [persistAtom],
})
