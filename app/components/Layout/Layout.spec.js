import React from 'react'
import renderer from 'react-test-renderer'
import Layout from './'

jest.mock('../Navigation', () => 'Navigation')

describe('Layout component', () => {
  const item = renderer.create(<Layout><div>child</div></Layout>)

  it('should match snapshot', () => {
    expect(item.toJSON()).toMatchSnapshot()
  })
})
