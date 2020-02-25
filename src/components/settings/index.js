import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { SitesList } from '../sites-list/sites-list'
import { TurnOff } from '../turn-off/'

export const Settings = () => {
  const [isOn, setOn] = useState(
    JSON.parse(localStorage.getItem('isOn')) || false
  )

  return (
    <div>
      <Title>Настройки расширения</Title>
      <Body on={isOn}>
        <SitesList disabled={!isOn} />
      </Body>
      <TurnOff on={isOn} onChange={val => setOn(val)} />
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
