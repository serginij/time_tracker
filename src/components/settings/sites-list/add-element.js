import React, { useState } from 'react'
import { styled } from 'linaria/react'

import { Wrapper, Button } from '@ui'

const labels = [
  { name: 'Работа', color: '#FF7878' },
  { name: 'Соцсети', color: '#758BFF' },
  { name: 'Отдых', color: '#7CFFA1' },
  { name: 'Хобби', color: '#F097FF' }
]

export const AddElement = ({ onAdd }) => {
  let [text, setText] = useState('')
  let [selected, setSelected] = useState('')

  const handleChange = e => setText(e.target.value)
  const handleAdd = () => {
    onAdd(text)
    setText('')
  }

  const buttons = labels.map(label => (
    <Label
      key={label.name + label.color}
      color={label.color}
      selected={label.name === selected}
      onClick={() => setSelected(label.name)}
      type="button"
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
        />
        <Button disabled={text.length === 0}>Добавить</Button>
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

  &:focus {
    outline: 2px solid var(--primary);
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
  cursor: pointer;
  margin-right: 10px;
  background-color: ${props => (props.selected ? props.color : '#cccccc')};

  &:focus {
    outline: 2px solid #fff;
  }
`
