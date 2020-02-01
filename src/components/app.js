import React from 'react'
import { styled } from 'linaria/react'

import { Main } from './main'

export const App = () => (
  <div>
    <Title>Time tracker options</Title>
    <Main />
  </div>
)

const Title = styled.h1`
  text-align: center;
`
