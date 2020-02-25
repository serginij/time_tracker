import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import { Wrapper, Switch } from '@ui'

import { SiteElement } from './site-element'
import { AddElement } from './add-element'

export const SitesList = ({ disabled }) => {
  let [sites, setSites] = useState([])

  const [checked, setChecked] = useState(false)

  const handleAddSite = url => {
    let newSites = [...sites]
    let newUrl = url.split('/')
    if (newUrl.length == 3) {
      newUrl.slice(2, 3)
    }
    newUrl.join('')
    if (sites.filter(item => item.url === url).length == 0) {
      newSites.push({
        url: url,
        favicon: 'https://' + url + '/favicon.ico',
        time: 0
      })
    }
    localStorage.setItem('customSites', JSON.stringify(newSites))
    setSites(newSites)
  }

  const handleDeleteSite = url => {
    let newSites = sites.filter(site => site.url !== url)
    localStorage.setItem('customSites', JSON.stringify(newSites))
    setSites(newSites)
  }

  const handleCheck = e => {
    localStorage.setItem('useCustomSites', e.target.checked)
    setChecked(e.target.checked)
    // onModeChange(e.target.checked)
  }

  useEffect(() => {
    setSites(JSON.parse(localStorage.getItem('customSites')) || [])
    setChecked(JSON.parse(localStorage.getItem('useCustomSites')))
  }, [])

  let list = sites.map((site, index) => (
    <Item key={site.url}>
      <SiteElement
        border={index > 0}
        url={site.url}
        favicon={site.favicon}
        time={site.time}
      />
      <CloseButton
        disabled={!checked || disabled}
        onClick={() => handleDeleteSite(site.url)}
      >
        {'×'}
      </CloseButton>
    </Item>
  ))
  return (
    <>
      <Wrapper>
        <Header>
          <SubTitle>Избранные сайты: </SubTitle>
          <Switch onClick={handleCheck} checked={checked} disabled={disabled} />
        </Header>
        <List checked={checked}>
          {list}
          {/* <Item>
          <AddElement disabled={!checked || disabled} onClick={handleAddSite} />
        </Item> */}
        </List>
      </Wrapper>
      <AddElement onAdd={handleAddSite} />
    </>
  )
}

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
`

const SubTitle = styled.h2`
  text-align: center;
  padding-left: 40px;
  flex-grow: 10;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  opacity: ${props => (props.checked ? '1' : '0.5')};
`

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 30px;
  padding: 0;
`

const CloseButton = styled.button`
  font-size: 2em;
  font-weight: 300;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: rgba(0, 125, 215, 0);
  color: black;
  margin-bottom: 4px
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
`
