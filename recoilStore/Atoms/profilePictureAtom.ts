import { atom } from 'recoil'
import { PROFILE_PICTURE } from 'network/config/queryKeys'

export const profilePictureAtom = atom({
  key: PROFILE_PICTURE,
  default: { image: '' },
})
