import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Link } from 'react-router-dom'
import about from '@assets/about.svg'
import settings from '@assets/settings.svg'
import stats from '@assets/stats.svg'

const links = [
  { name: 'Результаты', to: '/stats', icon: stats },
  { name: 'Настройки', to: '/settings', icon: settings },
  { name: 'О нас', to: '/about', icon: about }
]

export const Navbar = () => {
  const [current, setCurrent] = useState('/')

  useEffect(() => {
    setCurrent(location.pathname)
  }, [])

  let items = links.map(link => (
    <Item
      key={link.to}
      current={current === link.to}
      onClick={() => setCurrent(link.to)}
    >
      <Link className={styledLink} to={link.to}>
        <Icon src={link.icon} alt="" />
        {link.name}
      </Link>
    </Item>
  ))
  return (
    <Wrapper>
      <List>{items}</List>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 200px;
  font-family: 'Marmelad', sans-serif;
  background-color: var(--primary);
`

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  margin: 30px 0 0 0;

  box-sizing: border-box;
`

const Item = styled.li`
  list-style: none;
  box-sizing: border-box;
  width: 100%;
  background-color: ${props =>
    props.current ? 'var(--primary__dark)' : 'inherit'};
`

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`

const styledLink = css`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  padding: 8px 20px 8px 10px;
  color: var(--primary-text);
`
