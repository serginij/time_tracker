import React from 'react'
import { styled } from 'linaria/react'

export const SiteElement = ({ favicon, url, time, border = true }) => {
  return (
    <Wrapper border={border}>
      <Img src={favicon} alt={favicon + ' logo'} />
      <div>
        <Name>{url}</Name>
        <Time>{Math.round(time / 60, 1) + ' min'}</Time>
      </div>
      <Label color="#ff7878" type="button">
        Работа
      </Label>
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
`

const Time = styled.p`
  font-size: 12px;
  margin: 0;
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

const Label = styled.button`
  text-decoration: none;
  margin: 0;
  padding: 0;
  width: 100px;
  height: 2rem;
  font-size: 14px;
  border-radius: 1rem;
  color: var(--primary-text);
  border: none;
  margin-right: 10px;
  background-color: ${props => props.color};

  &:focus {
    outline: 2px solid #fff;
  }
`