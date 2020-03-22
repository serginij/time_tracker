import React from 'react'
import { AddElement } from '../sites-list/add-element'
import { SitesList, Header, Switch } from '../sites-list/sites-list'
import { Settings, TurnOff } from '../index'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
const renderList = () => {
  const { getByTestId, queryAllByTestId, queryAllByRole } = render(
    <SitesList disabled={false}>
      <Header>
        <Switch></Switch>
      </Header>
    </SitesList>
  )
  return { getByTestId, queryAllByTestId, queryAllByRole }
}
const renderInput = () => {
  const { queryAllByRole, getByText, getByRole } = render(<AddElement />)
  return { queryAllByRole, getByText, getByRole }
}
const renderTurnOff = () => {
  const { getByTestId } = render(
    <Settings>
      <TurnOff></TurnOff>
    </Settings>
  )
  return { getByTestId }
}

describe('off timer', () => {
  test('off timer add list', () => {
    const listUrl = [
      'google.com',
      'habr.com',
      'vk.com',
      'yandex.ru',
      'asm.com',
      'fd.com',
      'ui.com'
    ]
    const { queryAllByTestId } = renderList()
    const list = queryAllByTestId('favorite-list')[0]
    const { getByTestId } = renderTurnOff()

    fireEvent.click(getByTestId('off-button'))
    addSites(listUrl)

    expect(list.children).toHaveLength(7)
  })

  test('off timer delete list', () => {
    const { queryAllByTestId } = renderList()
    const list = queryAllByTestId('favorite-list')[0]
    checkbox()
    deleteSites(queryAllByTestId, 1)
    expect(list.children).toHaveLength(6)
  })
})

const addSites = listUrl => {
  const { queryAllByRole } = renderInput()

  for (let i = 0; i < listUrl.length; i++) {
    // заполнение input
    fireEvent.change(queryAllByRole('textbox')[0], {
      target: { value: listUrl[i] }
    })
    //нажатие на label
    fireEvent.click(queryAllByRole('button')[2])
    // нажатие на кнопку Добавить
    const btn = render(<AddElement />).queryAllByTestId('button-add')[0]
    fireEvent.click(btn)
  }
}
const deleteSites = (queryAllByTestId, i) => {
  fireEvent.click(queryAllByTestId('del-list')[i])
}
const checkbox = () => {
  const checkbox = renderList().queryAllByRole('checkbox')[0]
  fireEvent.click(checkbox)
}
