import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Wrapper, Button } from '@ui'

export const TurnOff = ({ on = true, onChange }) => {
  const [checked, setChecked] = useState(on)

  const handleCheck = () => {
    localStorage.setItem('isOn', !checked)
    setChecked(!checked)
    onChange(!checked)
  }

  return (
    <Wrapper>
      <SubTitle>Глобальное выключение таймера</SubTitle>
      <p>
        Если вы хотите отключить таймер на всех сайтах, то нажмите на кнопку.
        При отключении таймера статистика вестись не будет
      </p>

      <Button
        data-testid="off-button"
        className={buttonStyles}
        type="button"
        onClick={handleCheck}
      >
        {checked ? 'Отключить ' : 'Включить '}таймер
      </Button>
    </Wrapper>
  )
}

const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  justify-content: center;
  padding-right: 3%;
  label {
    margin-left: 30px;
  }
`

const buttonStyles = css`
  width: 200px;
  margin: 20px 0;
`
