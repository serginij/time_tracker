import React from 'react'
import { AddElement } from './add-element'
import { SitesList } from './sites-list'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
// render
const renderList = () => {
  const { getByTestId, queryAllByTestId, queryAllByRole } = render(
    <SitesList disabled={false}></SitesList>
  )
  return { getByTestId, queryAllByTestId, queryAllByRole }
}
const renderInput = () => {
  const { queryAllByRole, getByText, getByRole } = render(<AddElement />)
  return { queryAllByRole, getByText, getByRole }
}
describe('add to favorite sites', () => {
  test('conteins 5 elements', () => {
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

const addSites = listUrl => {
  const { queryAllByRole } = renderInput()
  //---
  const add = render(<AddElement />).queryAllByTestId('button-add')[0]
  const text = queryAllByRole('textbox')[0]
  const label = queryAllByRole('button')[1]
  //---
  for (let i = 0; i < listUrl.length; i++) {
    // заполнение input
    fireEvent.change(text, {
      target: { value: listUrl[i] }
    })
    //нажатие на label
    fireEvent.click(label)
    // нажатие на кнопку Добавить
    fireEvent.click(add)
  }
}
const deleteSites = (queryAllByTestId, i) => {
  fireEvent.click(queryAllByTestId('del-list')[i]) || false
}
const checkbox = () => {
  const checkbox = renderList().queryAllByRole('checkbox')[0]
  fireEvent.click(checkbox)
}
