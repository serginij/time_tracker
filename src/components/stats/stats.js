import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Wrapper, Button, Link } from '@ui'
import { Today } from './today'
import { TotalTime } from './total-time'
import { StatsByLabels } from './by-labels'

export const Stats = () => {
  const mode = JSON.parse(localStorage.getItem('useCustomSites'))

  let sites = mode
    ? localStorage.getItem('customSites') || '[]'
    : localStorage.getItem('allSites') || '[]'

  let stats = mode
    ? localStorage.getItem('customStats') || '{}'
    : localStorage.getItem('allStats') || '{}'

  let count = 0
  return (
    <>
      <TotalTime sites={JSON.parse(sites)} />
      <Wrapper className={favBlock}>
        <h2>Избранные сайты:</h2>
        <Sites>
          {(JSON.parse(localStorage.getItem('customSites')) || []).map(
            (site, index) => {
              if (index < 5)
                return (
                  <Img
                    key={site.url}
                    src={site.favicon}
                    alt={site.favicon + ' logo'}
                  />
                )
              else {
                count++
              }
            }
          )}
          <More>{count > 0 && '+ ' + count}</More>
        </Sites>
        <Button>
          <Link to="/settings">Добавить</Link>
        </Button>
      </Wrapper>
      <Title>Статистика</Title>
      <Wrapper className={chartStyle}>
        <Today stats={JSON.parse(stats)} sites={JSON.parse(sites)} />
      </Wrapper>
      {mode && (
        <Wrapper className={chartStyle}>
          <StatsByLabels tats={JSON.parse(stats)} sites={JSON.parse(sites)} />
        </Wrapper>
      )}
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

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`

const Sites = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`

const More = styled.p`
  font-size: 32px;
`
