import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { Main } from './main'
import { SitesList } from './sites-list/sites-list'

export const App = () => {
  const [mode, setMode] = useState(
    JSON.parse(localStorage.getItem('useCustomSites'))
  )
  let sites = mode
    ? localStorage.getItem('customSites')
    : localStorage.getItem('allSites')

  let onModeChange = mode => {
    setMode(mode)
  }
  return (
    <div>
      <Title>Time tracker options</Title>
      <SitesList onModeChange={onModeChange} />
      <Main sites={JSON.parse(sites) || []} />
    </div>
  )
}

const Title = styled.h1`
  text-align: center;
`
