import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import counter from './counter'

export default combineReducers({
  form: formReducer,
  counter,
})
