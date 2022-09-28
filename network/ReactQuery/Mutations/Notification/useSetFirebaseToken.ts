import { setFirebaseTokenService } from 'network/Services/Mutations/firebase'
import { SAVE_FIREBASE_TOKEN } from 'network/config/queryKeys'
import { useMutation } from 'react-query'
import { ErrorMsgDefault } from 'constants/constants'

export const useSetFirebaseToken = () => {
  const setFirebaseTokenMutation = useMutation(
    SAVE_FIREBASE_TOKEN,
    setFirebaseTokenService,
    {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error: Record<any, any>) => {
        const errMsg = error?.response?.data?.message || ErrorMsgDefault
      },
    }
  )

  const {
    mutate: setFirebaseToken,
    isLoading: setFirebaseTokenLoading,
    isSuccess: setFirebaseTokenSuccess,
    isError: setFirebaseTokenError,
    data,
  } = setFirebaseTokenMutation

  return {
    setFirebaseToken,
    setFirebaseTokenMutation,
    setFirebaseTokenLoading,
    setFirebaseTokenSuccess,
    setFirebaseTokenError,
    data,
  }
}
