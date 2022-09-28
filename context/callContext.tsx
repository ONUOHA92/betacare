import {
  FunctionComponent,
  createContext,
  useReducer,
  useContext,
  Dispatch,
} from 'react'
import { reducer, defaultState } from 'utils/messaging/call-store'
export const CallStateContext = createContext<[any, Dispatch<any>]>([
  {
    view: 'default',
  },
  () => {},
])

export const CallContextProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <CallStateContext.Provider value={[{ callState: state }, dispatch]}>
      {children}
    </CallStateContext.Provider>
  )
}

export function useCallState() {
  return useContext(CallStateContext)
}
