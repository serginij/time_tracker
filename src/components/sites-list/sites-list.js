import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import { SiteElement } from './site-element'
import { AddElement } from './add-element'
import { Switch } from './switch'

export const SitesList = ({ onModeChange, disabled }) => {
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
        disabled={!checked || disabled}
      />
    </Item>
  ))
  return (
    <>
      <SubTitle>Use custom sites list ?</SubTitle>
      <Switch onClick={handleCheck} checked={checked} disabled={disabled} />
      <List checked={checked}>
        {list}
        <Item>
          <AddElement disabled={!checked || disabled} onClick={handleAddSite} />
        </Item>
      </List>
    </>
  )
}

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
