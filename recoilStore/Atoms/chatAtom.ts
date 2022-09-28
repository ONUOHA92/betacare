import { atom } from 'recoil'
import { ONLINE_USERS_KEY, CHAT_NOTIFICATIONS } from 'network/config/queryKeys'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const onlineUsersAtom = atom({
  key: ONLINE_USERS_KEY,
  default: null,
})

export const chatNotificationsAtom = atom({
  key: CHAT_NOTIFICATIONS,
  default: [],
  effects_UNSTABLE: [persistAtom],
})
