import React from 'react'
import { shallow } from 'enzyme'
import Home from './'

describe('Home component test', () => {
  const item = shallow(<Home />)

  it('Should render text', () => {
    expect(item.find('.root').contains('Yep, it works')).toBe(true)
  })
})
