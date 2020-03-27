import React from 'react'
import { AddElement } from '../sites-list/add-element'
import { SitesList } from '../sites-list/sites-list'
import { TurnOff } from './index'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

const renderList = (disabled = false) => {
  const { getByTestId, queryAllByTestId, queryAllByRole } = render(
    <SitesList disabled={disabled} />
  )
  return { getByTestId, queryAllByTestId, queryAllByRole }
}
const renderInput = () => {
  const { queryAllByRole, getByText, getByRole, getByTestId } = render(
    <AddElement />
  )
  return { queryAllByRole, getByText, getByRole, getByTestId }
}

describe('off timer', () => {
  test('button change text on click', () => {
    render(<TurnOff onChange={() => {}} />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('Включить таймер')
  })

  test('delete sites list element', () => {
    const { queryAllByTestId } = renderList()
    const list = queryAllByTestId('favorite-list')[0]
    checkbox()
    addSites()
    fireEvent.click(queryAllByTestId('del-list')[0])
    expect(list.children).toHaveLength(6)
  })
  test('change target', () => {
    const { queryAllByTestId } = renderList()
    const goal = queryAllByTestId('goal')[0]

    addSites()
    fireEvent.change(goal, {
      target: { value: 2 }
    })
    console.log(goal.value)
    expect(goal.value).toHaveLength(1)
  })
})

const addSites = (
  listUrl = [
    'google.com',
    'habr.com',
    'vk.com',
    'yandex.ru',
    'asm.com',
    'fd.com',
    'ui.com'
  ]
) => {
  const { queryAllByRole } = renderInput()

  const add = render(<AddElement />).queryAllByTestId('button-add')[0]
  const text = queryAllByRole('textbox')[0]
  const label = queryAllByRole('button')[1]

  for (let i = 0; i < listUrl.length; i++) {
    // заполнение input
    fireEvent.change(text, {
      target: { value: listUrl[i] }
    })

    fireEvent.click(label)
    fireEvent.click(add)
  }
}

const checkbox = () => {
  const checkbox = renderList().queryAllByRole('checkbox')[0]
  fireEvent.click(checkbox)
}
