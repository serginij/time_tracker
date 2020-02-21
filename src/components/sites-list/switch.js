import React from 'react'
import { styled } from 'linaria/react'

export const Switch = ({
  onClick,
  checked = false,
  color = '2196f3',
  disabledColor = 'cccccc',
  disabled = false
}) => {
  const handleChange = e => {
    !disabled && onClick(e)
  }
  return (
    <Label disabled={disabled} color={color}>
      <Checkbox type="checkbox" checked={checked} onChange={handleChange} />
      <Slider className="slider" color={disabledColor} />
    </Label>
  )
}

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: ${props => '#' + props.color};
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    &:checked + .slider:before {
      -webkit-transform: translateX(18px);
      -ms-transform: translateX(18px);
      transform: translateX(18px);
    }
  }
`

const Checkbox = styled.input``

const Slider = styled.span`
  position: absolute;
  /* cursor: pointer; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => '#' + props.color};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 11px;

  &::before {
    position: absolute;
    content: '';
    height: 13px;
    width: 13px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`
