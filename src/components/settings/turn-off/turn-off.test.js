import React from 'react'
import { AddElement } from '../sites-list/add-element'
import { SitesList } from '../sites-list/sites-list'
import { Settings, TurnOff } from '../index'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)
// let warning
const renderList = () => {
  const { getByTestId, queryAllByTestId, queryAllByRole } = render(
    <SitesList></SitesList>
  )
  return { getByTestId, queryAllByTestId, queryAllByRole }
}
const renderInput = () => {
  const { queryAllByRole, getByText, getByRole } = render(<AddElement />)
  return { queryAllByRole, getByText, getByRole }
}
const renderTurnOff = () => {
  const { getByTestId, getByText } = render(
    <Settings>
      <TurnOff></TurnOff>
    </Settings>
  )
  return { getByTestId, getByText }
}

describe('off timer', () => {
  test('off timer add list', () => {
    // const listUrl = [
    //   'google.com',
    //   'habr.com',
    //   'vk.com',
    //   'yandex.ru',
    //   'asm.com',
    //   'fd.com',
    //   'ui.com'
    // ]
    const { getByTestId, getByText } = renderTurnOff()
    // const { queryAllByTestId } = renderList()
    // const list = queryAllByTestId('favorite-list')[0]

    fireEvent.click(getByTestId('off-button'))

    // addSites(listUrl)
    console.log(getByTestId('off-button'))
    // expect(list.children).toHaveLength(0)
    expect(getByText('Отключить таймер')).toBeInTheDocument()
  })

  test('off timer delete list', () => {
    const { queryAllByTestId } = renderList()
    const list = queryAllByTestId('favorite-list')[0]
    checkbox()
    deleteSites(queryAllByTestId, 1)
    expect(list.children).toHaveLength(6)
  })
  test('off timer change target', () => {
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
    const goal = queryAllByTestId('goal')[0]

    addSites(listUrl)
    fireEvent.change(goal, {
      target: { value: 2 }
    })
    console.log(goal.value)
    expect(goal.value).toHaveLength(1)
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
    // console.log(warning)
    //нажатие на label
    fireEvent.click(label)
    // нажатие на кнопку Добавить
    fireEvent.click(add)
  }
}
const deleteSites = (queryAllByTestId, i) => {
  fireEvent.click(queryAllByTestId('del-list')[i])
}
const checkbox = () => {
  const checkbox = renderList().queryAllByRole('checkbox')[0]
  fireEvent.click(checkbox)
}
