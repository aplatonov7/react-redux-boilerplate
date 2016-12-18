import React from 'react'
import renderer from 'react-test-renderer'
import NotFound from './'

describe('NotFound component', () => {
  const item = renderer.create(<NotFound />)

  it('should match snapshot', () => {
    expect(item.toJSON()).toMatchSnapshot()
  })
})
