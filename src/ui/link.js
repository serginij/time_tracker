import React from 'react'
import { css } from 'linaria'

import { Link as Li } from 'react-router-dom'

export const Link = ({ children, className, to }) => {
  return (
    <Li to={to} className={styledLink + ' ' + className}>
      {children}
    </Li>
  )
}

const styledLink = css`
  text-decoration: none;
  color: inherit;
`
