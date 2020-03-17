import React from 'react'
import { Router, Redirect } from 'react-router'

import { Routes, history } from '../routes'
import { CommonContent } from '@ui'

export const App = () => {
  return (
    <Router history={history}>
      <CommonContent>
        <Routes />
      </CommonContent>
      <Redirect
        exact
        from="/"
        to={{ pathname: '/settings', search: location.search }}
      />
    </Router>
  )
}
