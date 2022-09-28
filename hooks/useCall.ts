import { useReducer, Dispatch, useEffect } from 'react'

// TYPE DEFINITIONS
interface IDefaultState {
  callState: 'idle' | 'joining' | 'joined' | 'calling'
  callMetadata: {
    modeOfCall: 'audio' | 'video'
    caller: {
      firstName: string
      lastName: string
      profilePics: string
    }
  }
  channelId: string
  userId: string
}

interface IAction {
  type: string
  payload?: Partial<IDefaultState>
}

const reducer = (
  state: IDefaultState,
  { type, payload = {} }: IAction
): IDefaultState => {
  if (type === 'ACCEPT_CALL') {
    const updatedState: IDefaultState = {
      ...state,
      ...payload,
      callState: 'joining',
    }
    sessionStorage.setItem('call_session', JSON.stringify(updatedState))
    return updatedState
  } else if (type === 'MAKE_VOICE_CALL') {
    const updatedState: IDefaultState = {
      ...state,
      callMetadata: { ...state.callMetadata, modeOfCall: 'audio' },
      callState: 'calling',
    }
    sessionStorage.setItem('call_session', JSON.stringify(updatedState))
    return updatedState
  } else if (type === 'MAKE_VIDEO_CALL') {
    const updatedState: IDefaultState = {
      ...state,
      callMetadata: { ...state.callMetadata, modeOfCall: 'video' },
      callState: 'calling',
    }
    sessionStorage.setItem('call_session', JSON.stringify(updatedState))
    return updatedState
  } else if (type === 'JOINED_CALL') {
    const updatedState: IDefaultState = {
      ...state,
      callState: 'joined',
    }
    sessionStorage.setItem('call_session', JSON.stringify(updatedState))
    return updatedState
  } else if (type === 'HYDRATE') {
    return payload as IDefaultState
  } else {
    return state
  }
}

const localCache: IDefaultState =
  typeof window !== 'undefined' &&
  JSON.parse(sessionStorage.getItem('call_session'))

const defaultState: IDefaultState = localCache || {
  callState: 'idle',
  callMetadata: {
    modeOfCall: 'audio',
    caller: {
      firstName: '',
      lastName: '',
      profilePics: '',
    },
  },
  channelId: '',
  userId: '',
}

export const useCall = (): [IDefaultState, Dispatch<IAction>] => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    const localCache = sessionStorage.getItem('call_session')
    if (localCache) {
      dispatch({
        type: 'HYDRATE',
        payload: JSON.parse(localCache),
      })
    }
  }, [])

  return [state, dispatch]
}
