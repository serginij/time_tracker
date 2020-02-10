import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import { SiteElement } from './site-element'
import { AddElement } from './add-element'
import { Switch } from './switch'

export const SitesList = ({ onModeChange }) => {
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
    if (e.target.checked) {
      localStorage.setItem('allSites', localStorage.getItem('sites'))
      localStorage.setItem('sites', localStorage.getItem('customSites'))
    } else {
      localStorage.setItem('customSites', localStorage.getItem('sites'))
      localStorage.setItem('sites', localStorage.getItem('allSites'))
    }
    localStorage.setItem('useCustomSites', e.target.checked)
    setChecked(e.target.checked)
    onModeChange(e.target.checked)
  }

  useEffect(() => {
    setSites(JSON.parse(localStorage.getItem('customSites')))
    setChecked(JSON.parse(localStorage.getItem('useCustomSites')))
  }, [])

  let list = sites.map(site => (
    <Item key={site.url}>
      <SiteElement
        onDelete={() => handleDeleteSite(site.url)}
        url={site.url}
        favicon={site.favicon}
        time={site.time}
        disabled={!checked}
      />
    </Item>
  ))
  return (
    <Wrapper>
      <SubTitle>Which sites to be tracked ?</SubTitle>
      <Switch onClick={handleCheck} checked={checked} />
      <List checked={checked}>
        {list}
        <Item>
          <AddElement disabled={!checked} onClick={handleAddSite} />
        </Item>
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 3%;
`

const SubTitle = styled.h2``

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  opacity: ${props => (props.checked ? '1' : '0.5')};
`

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  padding: 0;
`
