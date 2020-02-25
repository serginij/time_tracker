import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { Table } from './table'
import { SitesList } from '../sites-list/sites-list'
import { TurnOff } from '../turn-off/'
import { Stats } from '../stats/stats'

export const Main = () => {
  const [mode, setMode] = useState(
    JSON.parse(localStorage.getItem('useCustomSites'))
  )
  const [isOn, setOn] = useState(
    JSON.parse(localStorage.getItem('isOn')) || false
  )

  let sites = mode
    ? localStorage.getItem('customSites')
    : localStorage.getItem('allSites')

  let stats = mode
    ? localStorage.getItem('customStats')
    : localStorage.getItem('allStats')

  let onModeChange = mode => {
    setMode(mode)
  }
  return (
    <div>
      <Title>Limer options</Title>
      <TurnOff on={isOn} onChange={val => setOn(val)} />
      <Body on={isOn}>
        <SitesList onModeChange={onModeChange} disabled={!isOn} />
        <Table sites={JSON.parse(sites) || []} />
        <Stats
          stats={JSON.parse(stats) || {}}
          sites={JSON.parse(sites) || []}
        />
      </Body>
    </div>
  )
}

const Title = styled.h1`
  text-align: center;
`

const Body = styled.div`
  opacity: ${props => (props.on ? '1' : '0.5')};
  margin: 0 3%;
  cursor: initial;
`
