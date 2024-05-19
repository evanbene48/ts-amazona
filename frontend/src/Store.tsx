import React from 'react'

type AppState = {
  mode: string
}

// if localstorage.getItem mode exist, use it
// otherwise check the window.matchMedia
const initialState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
}

type Action = {
  type: string
}
// function reducer(state: AppState, action: Action): AppState {
function reducer(state: { mode: string }, action: { type: string }) {
  switch (action.type) {
    case 'SWITCH_MODE':
      return { mode: state.mode === 'dark' ? 'light' : 'dark' }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<unknown>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  //Returning a component named "Provider" inside const "Store"
  // that we create
  // to provide the value = state and dispatch
  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
