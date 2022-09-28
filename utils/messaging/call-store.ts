const AgoraRTM = {
  createInstance(id: string, pr: any) {},
}

export interface ICallState {
  rtmClient: any
  view: 'default' | 'calling' | 'ringing'
}

const defaultState = {
  rtmClient: AgoraRTM.createInstance('218dae3913764490b235a8f3fc745fc0', {
    enableLogUpload: false,
  }),
  view: 'default',
}

const reducer = (state, action) => {
  console.log('state', state)
  console.log('action', action)
  switch (action.type) {
    case 'CHANGE_VIEW':
      return { ...state, view: action.payload }
    default:
      return state
  }
}

export { reducer, defaultState }
