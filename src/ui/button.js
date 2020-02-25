import { styled } from 'linaria/react'

export const Button = styled.button`
  height: 2rem;
  background-color: var(--primary__dark);
  border-radius: 3px;
  font-size: 14px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  min-width: 100px;

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`
