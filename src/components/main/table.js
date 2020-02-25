import React from 'react'
import { styled } from 'linaria/react'

import { formatTime } from './format-time'

export const Table = ({ sites = [] }) => {
  let list = sites.map(item => {
    return (
      <Item key={item.url + item.time}>
        <Website>{item.url}</Website>
        <Time>{formatTime(item.time).time}</Time>
      </Item>
    )
  })

  return (
    <>
      <SubTitle>Time spent on websites</SubTitle>
      <List data-testid="list">{list}</List>
    </>
  )
}

const SubTitle = styled.h2`
  /* margin-left: 3%; */
`

const List = styled.ul`
  list-style: none;
  padding: 0 2%;
`

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  border-top: solid 1px black;
  box-sizing: border-box;
  padding: 0 3%;
  align-items: center;

  &:first-child {
    border-top: none;
  }
`

const Website = styled.p``

const Time = styled.p`
  border-left: 1px solid black;
  padding: 1em 0 1em 1em;
  height: 100%;
  margin: 0;
  min-width: 60px;
  text-align: center;
`
