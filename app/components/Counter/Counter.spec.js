import React from 'react'
import { shallow } from 'enzyme'
import Counter from './'

describe('Counter component test', () => {
  const props = {
    value: 0,
    incrementByOne: jest.fn(),
    incrementByOneAync: jest.fn(),
    reset: jest.fn(),
  }
  const item = shallow(<Counter {...props} />)

  it('Should render three buttons and pass them valid props and styles', () => {
    const btns = item.find('.actions button.btn')
    expect(btns.length).toBe(3)
    btns.forEach(e => e.simulate('click'))
    expect(props.incrementByOne.mock.calls.length).toBe(1)
    expect(props.incrementByOneAync.mock.calls.length).toBe(1)
    expect(props.reset.mock.calls.length).toBe(1)
  })

  it('Should render value', () => {
    expect(item.find('div.value').text()).toBe(props.value.toString())
  })

  it('Should render text', () => {
    expect(item.contains('Mandatory counter example:')).toBe(true)
  })
})
