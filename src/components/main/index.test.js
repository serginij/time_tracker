import React from 'react'
import { Main } from './index'
import { Router } from 'react-router'
import { history } from '../../routes'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

const renderApp = () => {
  const { getByText } = render(
    <Router history={history}>
      <Main />
    </Router>
  )

  return { getByText }
}

describe('Sample test', () => {
  test('render app without crashes', () => {
    const text = 'Limer options'
    const { getByText } = renderApp()
    const container = getByText(text)

    expect(container).toBeInTheDocument()
  })
})
