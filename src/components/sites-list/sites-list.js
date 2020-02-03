import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'

import { SiteElement } from './site-element'
import { AddElement } from './add-element'

export const SitesList = () => {
  let [sites, setSites] = useState([
    {
      url: 'habr.com',
      favicon:
        'https://sun9-13.userapi.com/c857024/v857024708/197d7/xr27umrtkvo.jpg?ava=1',
      time: 100
    }
  ])

  const handleAddSite = url => {
    let newSites = [...sites]
    let newUrl = url.split('/')
    if (newUrl.length == 3) {
      newUrl.slice(2, 3)
    }
    newUrl.join('')
    newSites.push({
      url: url,
      favicon:
        'https://sun9-13.userapi.com/c857024/v857024708/197d7/xr27umrtkvo.jpg?ava=1',
      time: 0
    })
    localStorage.setItem('sites', JSON.stringify(newSites))
    setSites(newSites)
  }

  const handleDeleteSite = url => {
    let newSites = sites.filter(site => site.url !== url)
    localStorage.setItem('sites', JSON.stringify(newSites))
    setSites(newSites)
  }

  useEffect(() => {
    setSites(JSON.parse(localStorage.getItem('sites')) || [])
  }, [])

  let list = sites.map(site => (
    <Item key={site.url}>
      <SiteElement
        onDelete={() => handleDeleteSite(site.url)}
        url={site.url}
        favicon={site.favicon}
        time={site.time}
      />
    </Item>
  ))
  return (
    <Wrapper>
      <SubTitle>Which sites to be tracked ?</SubTitle>
      <List>
        {list}
        <Item>
          <AddElement onClick={handleAddSite} />
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
`

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  padding: 0;
`
