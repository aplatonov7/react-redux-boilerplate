import React from 'react'
import { createStore } from 'redux'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import App from './'

describe('App component', () => {
  const store = createStore(() => ({}))
  const item = shallow(<App store={store} />)

  it('should render Provider as root element', () => {
    expect(item.find(Provider).length).toBe(1)
  })
})
