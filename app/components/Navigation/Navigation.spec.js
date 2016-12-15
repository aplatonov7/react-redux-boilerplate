import React from 'react'
import { shallow } from 'enzyme'
import Navigation from './'

describe('Navigation component test', () => {
  const item = shallow(<Navigation />)

  it('Should render nav as root element', () => {
    expect(item.find('nav.root').length).toBe(1)
  })
})
