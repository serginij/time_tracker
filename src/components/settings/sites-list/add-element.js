import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { Wrapper, Button, Label } from '@ui'
import { labels } from './labels'

export const AddElement = ({ onAdd, disabled }) => {
  let [text, setText] = useState('')
  let [selected, setSelected] = useState('')

  const handleChange = e => setText(e.target.value)
  const handleAdd = e => {
    e.preventDefault()
    onAdd(text, selected)
    setText('')
  }

  const buttons = labels.map(label => (
    <Label
      key={label.name + label.color}
      color={label.color}
      selected={label.name === selected.name}
      onClick={() => setSelected(label)}
      type="button"
      disabled={disabled}
    >
      {label.name}
    </Label>
  ))

  return (
    <Wrapper>
      <h2>Добавление сайта в избранное</h2>
      <Text>
        Для добавления сайта в избранное введите название сайта или URL, а затем
        выберете категорию
      </Text>
      <Form onSubmit={handleAdd}>
        <Input
          placeholder="Название сайта или URL"
          value={text}
          onChange={handleChange}
          type="text"
          pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+$"
          disabled={disabled}
        />
        <Button
          disabled={text == '' || selected == '' || disabled}
          data-testid="button-add"
        >
          Добавить
        </Button>
      </Form>
      <Labels>{buttons}</Labels>
    </Wrapper>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Input = styled.input`
  width: 50%;
  box-sizing: border-box;
  height: 2rem;
  border-radius: 3px;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  background: #fff;
  border: none;
  margin-bottom: 8px;
  padding: 8px 0 8px 12px;
  font: inherit;
  font-family: Roboto;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};

  &:focus {
    outline: 2px solid var(--primary);
  }
  &:disabled {
    cursor: not-allowed;
  }
`

const Text = styled.p`
  text-align: left;
`

const Labels = styled.div`
  display: flex;
  margin: 30px 0;
  width: 100%;
`
