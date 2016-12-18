import React from 'react'
import renderer from 'react-test-renderer'
import Navigation from './'

describe('Navigation component', () => {
  const item = renderer.create(<Navigation />)

  it('should match snapshot', () => {
    expect(item.toJSON()).toMatchSnapshot()
  })
})
