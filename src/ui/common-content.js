import React from 'react'
import { styled } from 'linaria/react'

import { Navbar } from '@components/navbar'

export const CommonContent = ({ children }) => (
  <Body>
    <Navbar />
    <Wrapper>{children}</Wrapper>
  </Body>
)

const Body = styled.div`
  --primary: #047cdc;
  --primary__dark: #00569c;
  --primary-text: #ffffff;
  --secondary: #f4f4f4;
  --secondary__light: #ffffff;
  --secondary-text: #000000;

  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
  font-family: sans-serif;
`

const Wrapper = styled.div`
  background-color: var(--secondary);
  width: 100%;
`
