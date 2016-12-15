import React from 'react'
import { shallow } from 'enzyme'
import Layout from './Layout'
import Navigation from '../Navigation'

describe('Layout component test', () => {
  const child = <div className="test" />
  const item = shallow(<Layout>{child}</Layout>)

  it('Should render Navigation', () => {
    expect(item.find(Navigation).length).toBe(1)
  })

  it('Should render children', () => {
    expect(item.contains(child)).toBe(true)
  })
})
