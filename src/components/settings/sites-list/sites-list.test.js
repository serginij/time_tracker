import React from 'react'
import { AddElement } from './add-element'
import { SitesList, Header, Switch } from './sites-list'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
// render
export const renderList = () => {
  const { getByTestId, queryAllByTestId, queryAllByRole } = render(
    <SitesList disabled={false}>
      <Header>
        <Switch></Switch>
      </Header>
    </SitesList>
  )
  return { getByTestId, queryAllByTestId, queryAllByRole }
}
export const renderInput = () => {
  const { queryAllByRole, getByText, getByRole } = render(<AddElement />)
  return { queryAllByRole, getByText, getByRole }
}
describe('add to favorite sites', () => {
  test('conteins 3 elements', () => {
    const listUrl = ['google.com', 'habr.com', 'vk.com', 'yandex.ru', 'asm.com']
    const { getByTestId } = renderList()
    const list = getByTestId('favorite-list')
    addSites(listUrl)
    expect(list.children).toHaveLength(5)
  })

  test('delete elements', () => {
    const listUrl = ['google.com', 'habr.com', 'vk.com', 'yandex.ru', 'asm.com']
    const { queryAllByTestId } = renderList()
    const list = queryAllByTestId('favorite-list')[0]
    //добавление
    addSites(listUrl)
    //удаление
    checkbox()
    deleteSites(queryAllByTestId, 0)
    expect(list.children).toHaveLength(4)
  })
})

export const addSites = listUrl => {
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
export const deleteSites = (queryAllByTestId, i) => {
  fireEvent.click(queryAllByTestId('del-list')[i]) || false
}
export const checkbox = () => {
  const checkbox = renderList().queryAllByRole('checkbox')[0]
  fireEvent.click(checkbox)
}
