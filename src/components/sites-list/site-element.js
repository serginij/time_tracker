import React from 'react'
import { styled } from 'linaria/react'

export const SiteElement = ({ favicon, url, time, onDelete }) => {
  return (
    <>
      <Img src={favicon} alt={favicon + ' logo'} />
      <Name>{url}</Name>
      <Time>
        {Math.round(time / 60, 1) + ' min'}
        <CloseButton onClick={onDelete}>{'×'}</CloseButton>
      </Time>
    </>
  )
}

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid gray;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

const Name = styled.p`
  margin: 2px;
`

const Time = styled.p`
  font-size: 12px;
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
