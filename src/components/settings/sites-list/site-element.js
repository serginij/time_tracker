import React from 'react'
import { styled } from 'linaria/react'

import { Dropdown, Label } from '@ui'
import { labels } from './labels'

export const SiteElement = ({
  favicon,
  url,
  time,
  border = true,
  label,
  onUpdate
}) => {
  const buttons = labels.map(label => (
    <Label
      key={label.name + label.color}
      color={label.color}
      onClick={() => onUpdate(url, label)}
      type="button"
    >
      {label.name}
    </Label>
  ))

  return (
    <Wrapper border={border}>
      <Img src={favicon} alt={favicon + ' logo'} />
      <div>
        <Name>{url}</Name>
        <Time>{Math.round(time / 60, 1) + ' min'}</Time>
      </div>
      <Dropdown
        width={120}
        align
        close={false}
        content={<Labels>{buttons}</Labels>}
      >
        <Label selected color={label.color} type="button">
          {label.name}
        </Label>
      </Dropdown>
    </Wrapper>
  )
}

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* border: 1px solid gray; */
  cursor: pointer;
`

const Name = styled.p`
  margin: 2px;
  font-family: Roboto;
`

const Time = styled.p`
  font-size: 12px;
  margin: 0;
  font-family: Roboto;
  text-align: center;
`

const Wrapper = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: ${props => props.border && '1px solid lightgray'};
  padding: 10px;
`

// const Label = styled.button`
//   text-decoration: none;
//   margin: 0;
//   padding: 0;
//   width: 100px;
//   height: 2rem;
//   font-size: 14px;
//   border-radius: 1rem;
//   color: var(--primary-text);
//   border: none;
//   margin: 4px 0;
//   background-color: ${props => props.color};
//   cursor: pointer;

//   &:focus {
//     outline: 2px solid #fff;
//   }
// `

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
`
