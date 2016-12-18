import React from 'react'
import renderer from 'react-test-renderer'
import Home from './'

describe('Home component', () => {
  const item = renderer.create(<Home />)

  it('should match snapshot', () => {
    expect(item.toJSON()).toMatchSnapshot()
  })
})
