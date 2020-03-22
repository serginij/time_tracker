import React from 'react'
import { Navbar } from '../navbar/index'
import { Settings } from '../settings/index'
import { Stats } from '../stats/stats'
import { About } from '../about/about'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Router } from 'react-router'
import { history } from '../../routes'

afterEach(cleanup)

const renderNavbar = () => {
  return render(
    <Router history={history}>
      <Navbar />
    </Router>
  )
}
const renderStats = () => {
  return render(
    <Router history={history}>
      <Stats />
    </Router>
  )
}

const renderSettings = () => {
  return render(
    <Router history={history}>
      <Settings />
    </Router>
  )
}
const renderAbout = () => {
  return render(
    <Router history={history}>
      <About />
    </Router>
  )
}

describe('navbar test', () => {
  test('results show', () => {
    const btnStats = renderNavbar().getByText
    const stats = renderStats().getByText
    fireEvent.click(btnStats('Результаты'))
    expect(stats('Статистика')).toBeInTheDocument()
  })
  test('settings show', () => {
    const btnSettings = renderNavbar().getByText
    const settings = renderSettings().getByText
    fireEvent.click(btnSettings('Настройки'))
    expect(settings('Настройки расширения')).toBeInTheDocument()
  })
  test('about show', () => {
    const btnAbout = renderNavbar().getByText
    const about = renderAbout().getByText
    fireEvent.click(btnAbout('О нас'))
    expect(about('О ресурсе')).toBeInTheDocument()
  })
})
