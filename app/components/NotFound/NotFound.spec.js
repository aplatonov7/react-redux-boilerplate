import React from 'react'
import { shallow } from 'enzyme'
import NotFound from './'

describe('NotFound component test', () => {
  const item = shallow(<NotFound />)

  it('Should render text', () => {
    expect(item.find('.root').contains('Not Found')).toBe(true)
  })
})
