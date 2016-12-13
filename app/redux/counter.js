import { createTypes, createActions, handleActions } from '../utils/reduxUtils'

export const types = createTypes([
  'INCREMENT',
  'INCREMENT_ASYNC',
  'RESET',
], 'COUNTER')

const initialState = 0

const reducer = handleActions({
  [types.INCREMENT]: (state, { payload }) => state + payload,
  [types.RESET]: () => initialState,
}, initialState)

export const actions = createActions(types)

export const selectCounter = state => state.counter

export default reducer
