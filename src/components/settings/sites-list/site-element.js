import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Dropdown, Label } from '@ui'
import { labels } from './labels'

export const SiteElement = ({
  favicon,
  url,
  time,
  border = true,
  label,
  onUpdate,
  disabled
}) => {
  const buttons = labels.map(label => (
    <Label
      key={label.name + label.color}
      color={label.color}
      onClick={() => onUpdate(url, label)}
      type="button"
      selected
      className={labelStyles}
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
      {disabled ? (
        <Label color={label.color} type="button">
          {label.name}
        </Label>
      ) : (
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
      )}
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

const labelStyles = css`
  margin: 4px 0;
`

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
`
