import { styled } from 'linaria/react'

export const Label = styled.button`
  text-decoration: none;
  margin: 0;
  padding: 0;
  width: 100px;
  height: 2rem;
  font-size: 14px;
  font-family: inherit;
  border-radius: 1rem;
  color: var(--primary-text);
  border: none;
  cursor: pointer;
  margin-right: 10px;
  background-color: ${props => (props.selected ? props.color : '#cccccc')};

  &:focus {
    outline: 2px solid #fff;
  }
  &:disabled {
    cursor: not-allowed;
  }
`
