import { toast } from 'react-toastify'
import { useState } from 'react'
import { loginService } from 'network/Services/Mutations/auth'
import { useMutation } from 'react-query'
import { ErrorMsgDefault, LOGIN_200_MSG, TOKEN_EXPIRY } from 'constants/constants'
import { userAtom } from '../../../../recoilStore/Atoms/userAtom'
import { useSetRecoilState } from 'recoil'
import { setWithExpiry } from '../../../../utils/localStorage'
import { USER_TOKEN } from '../../../config/queryKeys'

export const useLogin = () => {
  const setUser = useSetRecoilState(userAtom)
  const [loginError, setLoginError] = useState('')
  const loginMutation = useMutation(loginService, {
    onSuccess: (data) => {
      const { data: userInfo }: any = data
      toast.success(LOGIN_200_MSG)
      setWithExpiry(USER_TOKEN, userInfo?.token, TOKEN_EXPIRY)
      setUser({ ...userInfo, isLoggedIn: true })
    },
    onError: (error: Record<any, any>) => {
      const errMsg = error?.response?.data?.message || ErrorMsgDefault
      setLoginError(errMsg)
      toast.error(errMsg)
    },
  })

  const { mutate: login, isLoading: isLoggingIn, isSuccess } = loginMutation

  return {
    login,
    isLoggingIn,
    isSuccess,
    loginError,
  }
}
