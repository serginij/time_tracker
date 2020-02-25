import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { formatTime } from '../main/format-time'
import { Wrapper } from '@ui'

export const TotalTime = ({ sites = [] }) => {
  const getTime = array =>
    array.reduce((acc, site) => {
      return acc + site.time
    }, 0)

  const todayTime = formatTime(getTime(sites))

  return (
    <Wrapper className={wrapperStyle}>
      <BackBlock>
        <CircleContainer>
          <Circle />
          <Circle />
        </CircleContainer>
        <Title>{todayTime.hrs + ' часов ' + todayTime.min + ' минут'}</Title>
        <SubTitle>всего времени в браузере</SubTitle>
        <CircleContainer>
          <Circle />
          <Circle />
        </CircleContainer>
      </BackBlock>
    </Wrapper>
  )
}

const Title = styled.h1`
  font-size: 36px;
  line-height: 39px;
  margin: 10px 0;
  margin-top: 0;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`

const SubTitle = styled.h2`
  font-size: 21.6px;
  line-height: 24px;
  margin: 10px 0;
  font-weight: normal;

  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`

const BackBlock = styled.div`
  background-color: var(--primary);
  width: 100%;
  height: 150px;
  border-radius: 20px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px;
  color: var(--primary-text);
`

const CircleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--primary__dark);
`

const wrapperStyle = css`
  padding: 20px;
  margin-top: 30px;
`
