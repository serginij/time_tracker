import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Wrapper, Button, Link } from '@ui'
import { Today } from './today'
import { TotalTime } from './total-time'

export const Stats = () => {
  const mode = JSON.parse(localStorage.getItem('useCustomSites'))

  let sites = mode
    ? localStorage.getItem('customSites')
    : localStorage.getItem('allSites')

  let stats = mode
    ? localStorage.getItem('customStats')
    : localStorage.getItem('allStats')

  console.log(stats, sites)
  return (
    <>
      <TotalTime sites={JSON.parse(sites)} />
      <Wrapper className={favBlock}>
        <h2>Избранные сайты:</h2>
        <Button>
          <Link to="/settings">Добавить</Link>
        </Button>
      </Wrapper>
      <Title>Статистика</Title>
      <Wrapper className={chartStyle}>
        <Today stats={JSON.parse(stats)} sites={JSON.parse(sites)} />
      </Wrapper>
    </>
  )
}

const Title = styled.h1`
  width: 100%;
  text-align: center;
`

const chartStyle = css`
  padding: 8px 0;
`

const favBlock = css`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  padding: 8px 30px;
`
