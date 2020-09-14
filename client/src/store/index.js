import { createStore } from 'redux'

const initialState = {
  account: {
    id: -1,
    username: ''
  }
}

const reducer = (state = initialState, action) => {
  if (action.type === 'LOGIN') {
    return Object.assign({}, state, {
      account: action.payload
    })
  }

  return state
}

const store = createStore(reducer);

export default store