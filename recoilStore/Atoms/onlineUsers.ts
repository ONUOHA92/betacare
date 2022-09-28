import { atom } from 'recoil'
import { ONLINE_USER_ATOM } from 'network/config/queryKeys'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const onlineUsersAtom = atom({
  key: ONLINE_USER_ATOM,
  effects_UNSTABLE: [persistAtom],
})
