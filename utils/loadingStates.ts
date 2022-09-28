interface Status {
  loading: any
  error: any
  success: any
}
export const getState = <State extends Status, Key>(
  state: State,
  stateName: keyof Key,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean
) => {
  return {
    loading: {
      ...state.loading,
      [stateName]: isLoading,
    },
    error: {
      ...state.error,
      [stateName]: isError,
    },
    success: {
      ...state.success,
      [stateName]: isSuccess,
    },
  }
}

export const reqState = <S, K>(state: S, namespace: keyof K) =>
  getState(state as any, namespace, true, false, false)
export const resState = <S, K>(state: S, namespace: keyof K) =>
  getState(state as any, namespace, false, false, true)
export const errState = <S, K>(state: S, namespace: keyof K) =>
  getState(state as any, namespace, false, true, false)
