import React from 'react'
import { styled } from 'linaria/react'

import { Main } from './main'
import { SitesList } from './sites-list/sites-list'

export const App = () => (
  <div>
    <Title>Time tracker options</Title>
    <SitesList />
    <Main sites={JSON.parse(localStorage.getItem('sites')) || []} />
  </div>
)

const Title = styled.h1`
  text-align: center;
`
