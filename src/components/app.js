import React from 'react'
import { Router } from 'react-router'

import { Routes, history } from '../routes'
import { CommonContent } from '@ui'

export const App = () => {
  return (
    <Router history={history}>
      <CommonContent>
        <Routes />
      </CommonContent>
    </Router>
  )
}
