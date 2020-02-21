import React, { useState } from 'react'
import { styled } from 'linaria/react'

export const AddElement = ({ onClick, disabled }) => {
  let [edit, setEdit] = useState(false)
  let [text, setText] = useState('')
  let [data, setData] = useState({})

  const handleChange = e => setText(e.target.value)
  const handleAdd = () => {
    onClick(text)
    setEdit(false)
    setText('')
  }

  const handleOpen = e => {
    setEdit(true)
    let { x, y, height } = e.target.getBoundingClientRect()
    setData({ x: x, y: y + height, width: 200 })
  }

  return (
    <>
      <Button disabled={disabled} onClick={handleOpen}>
        +
      </Button>
      {edit && (
        <Popup width={data.width} left={data.x} top={data.y}>
          <Header>
            <h3>Add website</h3>
            <CloseButton onClick={() => setEdit(false)}>×</CloseButton>
          </Header>
          <form onSubmit={handleAdd}>
            <Input
              placeholder="google.com"
              value={text}
              onChange={handleChange}
              type="text"
              pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+$"
            />
            <AddButton disabled={text.length === 0}>Add</AddButton>
          </form>
        </Popup>
      )}
    </>
  )
}

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  font-size: 32px;
  padding-bottom: 6px;
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};

  &:focus {
    outline: none;
  }
`

const Popup = styled.div`
  position: absolute;
  left: ${props => props.left + 'px'};
  top: ${props => props.top + 'px'};
  background-color: white;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  padding: 20px;
  padding-top: 0;

  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 2.5rem;
  border-radius: 3px;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  background: #fff;
  border: none;
  margin-bottom: 8px;
  padding: 8px 0 8px 12px;
  font: inherit;
`

const AddButton = styled.button`
  height: 2rem;
  background-color: #27ae60;
  border-radius: 3px;
  color: #ffffff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font: inherit;
  min-width: 100px;

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`

const CloseButton = styled.button`
  font-size: 2em;
  font-weight: 300;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: rgba(0, 125, 215, 0);
  color: black;
  margin-bottom: 2px
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};

  &:focus {
    outline: none;
  }
`

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
