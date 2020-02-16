import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { Main } from './main'
import { SitesList } from './sites-list/sites-list'
import { TurnOff } from './turn-off/'

export const App = () => {
  const [mode, setMode] = useState(
    JSON.parse(localStorage.getItem('useCustomSites'))
  )
  const [isOn, setOn] = useState(JSON.parse(localStorage.getItem('isOn')))

  let sites = mode
    ? localStorage.getItem('customSites')
    : localStorage.getItem('allSites')

  let onModeChange = mode => {
    setMode(mode)
  }
  return (
    <div>
      <Title>Limer options</Title>
      <TurnOff on={isOn} onChange={val => setOn(val)} />
      <Body on={isOn}>
        <SitesList onModeChange={onModeChange} disabled={!isOn} />
        <Main sites={JSON.parse(sites) || []} />
      </Body>
    </div>
  )
}

const Title = styled.h1`
  text-align: center;
`

const Body = styled.div`
  opacity: ${props => (props.on ? '1' : '0.5')};
  cursor: initial;
`
