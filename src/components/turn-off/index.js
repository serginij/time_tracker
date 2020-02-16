import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { Switch } from '../sites-list/switch'

export const TurnOff = ({ on = true, onChange }) => {
  const [checked, setChecked] = useState(on)

  const handleCheck = e => {
    localStorage.setItem('isOn', e.target.checked)
    setChecked(e.target.checked)
    onChange(e.target.checked)
  }

  return (
    <SubTitle>
      Turn on{' '}
      <Switch
        color="4caf50"
        disabledColor="f44336"
        checked={checked}
        onClick={handleCheck}
      />
    </SubTitle>
  )
}

const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  justify-content: flex-end;
  padding-right: 3%;
  label {
    margin-left: 30px;
  }
`
