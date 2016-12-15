import { delay } from 'redux-saga'
import { call, put, take, fork } from 'redux-saga/effects'
import { incrementAsync, incrementAsyncSaga } from '../counter'
import { actions, types } from '../../redux/counter'

describe('Counter sagas test', () => {
  it('Should emit increment with passed payload after 1000ms delay', () => {
    const generator = incrementAsync(actions.incrementAsync(3))
    expect(generator.next().value).toEqual(call(delay, 1000, null))
    expect(generator.next().value).toEqual(put(actions.increment(3)))
  })

  it('Should watch for increment action dispatch', () => {
    const generator = incrementAsyncSaga()
    expect(generator.next().value).toEqual(take(types.INCREMENT_ASYNC))
    const action = actions.incrementAsync(3)
    expect(generator.next(action).value).toEqual(fork(incrementAsync, action))
  })
})
