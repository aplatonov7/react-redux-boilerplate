import { createTypes, createActions, handleActions } from '../utils/reduxUtils'

export const types = createTypes([
  'INCREMENT_COUNTER',
  'RESET_COUNTER',
], 'COUNTER')

const initialState = 0

const reducer = handleActions({
  [types.INCREMENT_COUNTER]: (state, { payload }) => state + payload,
  [types.RESET_COUNTER]: () => initialState,
}, initialState)

export const actions = createActions(types)

export const selectCounter = state => state.counter

export default reducer
