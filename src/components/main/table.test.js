import React from 'react'
import { Table } from './table'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

describe('test table', () => {
  test('contains six elements', () => {
    const sitesTest = [
      { url: 'first', time: 1000 },
      {
        url:
          'qiwtrwqeirhodsfjhafhdsakjfhdsklahfksadlhfkjdashlfkjdhsafkjhdsakfhdsakjfhdaslkfhdsklfhal',
        time: 100
      },
      { url: '1', time: 110 },
      { url: 'asf', time: 1 },
      { url: '234', time: 234 },
      { url: 'last', time: 112 }
    ]

    let utils = render(<Table sites={sitesTest} />)
    let list = utils.getByTestId('list')
    expect(list.children).toHaveLength(6)
  })

  test('list is empty', () => {
    let utils = render(<Table sites={[]} />)
    let list = utils.getByTestId('list')

    expect(list.children).toHaveLength(0)
  })

  test('contains six elements', () => {
    const sitesTest = [{ url: 'first', time: 1005 }]

    let utils = render(<Table sites={sitesTest} />)
    let list = utils.getByTestId('list')

    expect(list.firstChild.children).toHaveLength(2)
    expect(list.firstChild.lastChild).toHaveTextContent('16:45')
  })
})
