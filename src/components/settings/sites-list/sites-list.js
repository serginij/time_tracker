import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import { Wrapper, Switch } from '@ui'

import { SiteElement } from './site-element'
import { AddElement } from './add-element'

export const SitesList = ({ disabled }) => {
  const [sites, setSites] = useState([])
  const [checked, setChecked] = useState(false)

  const handleAddSite = (url, label) => {
    let newSites = [...sites]
    let newUrl = url
      .split('www.')
      .join('')
      .split('/')
    if (newUrl.length == 3) {
      newUrl.slice(2, 3)
    }
    newUrl.join('')
    if (sites.filter(item => item.url === url).length == 0) {
      newSites.push({
        url: url,
        favicon: 'https://' + url + '/favicon.ico',
        time: 0,
        label: label,
        date: new Date().toLocaleDateString()
      })
    }
    localStorage.setItem('customSites', JSON.stringify(newSites))
    setSites(newSites)
  }

  const handleSetTime = (e, url) => {
    let error =
      !e.target.checkValidity() ||
      !(((e.target.value * 10) % 10).toString().length == 1)

    let total = 0
    let newSites = sites.map(site => {
      if (site.url === url) {
        site.goalErr = error
        if (!error && total + e.target.value <= 24) {
          site.goal = e.target.value
        } else {
          site.goalErr = true
        }
      } else if (site.goal) {
        total += site.goal
      }
      return site
    })
    localStorage.setItem('customSites', JSON.stringify(newSites))
    setSites(newSites)
  }

  const handleDeleteSite = url => {
    let newSites = sites.filter(site => site.url !== url)
    localStorage.setItem('customSites', JSON.stringify(newSites))
    setSites(newSites)
  }

  const handleUpdateLabel = (url, label) => {
    let newSites = sites.map(site => {
      if (site.url === url) {
        return { ...site, label: label }
      }
      return site
    })

    localStorage.setItem('customSites', JSON.stringify(newSites))
    setSites(newSites)
  }

  const handleCheck = e => {
    localStorage.setItem('useCustomSites', e.target.checked)
    setChecked(e.target.checked)
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
        label={site.label.color ? site.label : { color: '#eeeeee', name: '' }}
        onUpdate={handleUpdateLabel}
        disabled={disabled}
      />
      <Goal>
        <b>Цель, ч</b>
        <input
          type="number"
          min="0"
          max="24"
          step="0.1"
          defaultValue={site.goal}
          placeholder="0"
          onChange={e => handleSetTime(e, site.url)}
          disabled={disabled}
          data-testid="goal"
        />
        {site.goalErr && <p>Некорректный ввод</p>}
      </Goal>
      <CloseButton
        disabled={!checked || disabled}
        onClick={() => handleDeleteSite(site.url)}
        data-testid="del-list"
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
          <Switch
            data-testid="checkbox-on"
            onClick={handleCheck}
            checked={checked || false}
            disabled={disabled}
          />
        </Header>
        <List checked={checked} data-testid="favorite-list">
          {list}
        </List>
      </Wrapper>
      <AddElement onAdd={handleAddSite} disabled={disabled} />
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

const Goal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  p {
    color: crimson;
    font-size: 0.8em;
    margin: 0;
  }

  b {
    font-size: 0.8em;
    margin: 0;
  }

  input {
    width: 50px;
    padding: 4px 8px;
  }
`
