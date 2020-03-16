import React from 'react'
import { AddElement } from './add-element'
import { SitesList } from './sites-list'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

const renderList = () => {
  const { getByTestId, queryAllByTestId } = render(
    <SitesList disabled={false}></SitesList>
  )
  return { getByTestId, queryAllByTestId }
}
const renderInput = () => {
  const { queryAllByRole, getByText, getByRole } = render(<AddElement />)
  return { queryAllByRole, getByText, getByRole }
}

describe('add to favorite sites', () => {
  test('conteins 3 elements', () => {
    const listUrl = ['google.com', 'habr.com', 'vk.com', 'yandex.ru', 'asm.com']
    const { getByTestId } = renderList()
    const { queryAllByRole } = renderInput()

    const list = getByTestId('favorite-list')
    for (let i = 0; i < listUrl.length; i++) {
      //нажатие на label
      fireEvent.click(queryAllByRole('button')[2])
      // заполнение input
      fireEvent.change(queryAllByRole('textbox')[0], {
        target: { value: listUrl[i] }
      })
      // нажатие на кнопку Добавить
      const btn = render(<AddElement />).queryAllByTestId('button-add')[0]
      fireEvent.click(btn)
    }
    expect(list.children).toHaveLength(5)
  })
})
