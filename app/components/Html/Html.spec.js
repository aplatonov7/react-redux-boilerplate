import React from 'react'
import renderer from 'react-test-renderer'
import Html from './'

describe('Html container', () => {
  const props = {
    scripts: ['test-script', 'test-script2'],
    styles: ['test-style', 'test-style2'],
    initialState: { test: 1 },
    inlineStyles: 'inline styles',
  }
  const item = renderer.create(<Html {...props}><div>child</div></Html>)

  it('should match snapshot', () => {
    expect(item.toJSON()).toMatchSnapshot()
  })
})
