import React from 'react'
import { shallow } from 'enzyme'
import { CounterContainer } from './'
import CounterComponent from '../../components/Counter'

describe('Counter container test', () => {
  const props = {
    increment: jest.fn(),
    incrementAsync: jest.fn(),
    reset: jest.fn(),
    value: 0,
  }
  const item = shallow(<CounterContainer {...props} />)

  it('Should render Counter component with valid props', () => {
    const counter = item.find(CounterComponent)
    expect(counter.length).toBe(1)
    const counterProps = counter.props()
    expect(counterProps.value).toBe(props.value)
    expect(counterProps.reset).toBe(props.reset)
    counterProps.incrementByOne()
    counterProps.incrementByOneAync()
    expect(props.increment.mock.calls[0][0]).toBe(1)
    expect(props.incrementAsync.mock.calls[0][0]).toBe(1)
  })
})
