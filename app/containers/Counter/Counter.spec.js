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
    counterProps.incrementByOne()
    counterProps.incrementByOneAync()
    counterProps.reset()
    expect(props.increment).toHaveBeenCalledWith(1)
    expect(props.incrementAsync).toHaveBeenCalledWith(1)
    expect(props.reset).toHaveBeenCalledTimes(1)
  })
})
