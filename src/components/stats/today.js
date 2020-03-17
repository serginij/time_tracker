import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

import { formatTime } from '../main/format-time'

import left from '@assets/chevron-left.png'
import right from '@assets/chevron-right.png'

export const Today = ({ stats = {}, sites = [] }) => {
  let today = new Date()
  const [firstDay, setFirst] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    )
  )

  const getTime = array =>
    array.reduce((acc, site) => {
      let siteTime = formatTime(site.time)
      return +(acc + siteTime.hrs + siteTime.min / 60).toFixed(2)
    }, 0)

  const todayTime = getTime(sites)

  const storeToday = (index, array, date) => {
    if (index === today.getDay() && date === today.toLocaleDateString()) {
      array[index] = {
        date: today.toLocaleDateString(),
        time: todayTime
      }
    }
  }

  let newData = []

  for (let i = 6; i >= 0; i--) {
    let date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i - today.getDay()
    ).toLocaleDateString()

    if (i > today.getDay()) {
      newData[i] = { date: date, time: 0 }
    }

    storeToday(i, newData, date)
    if (i < today.getDay()) {
      if (stats[date]) {
        newData[i] = {
          date: date,
          time: getTime(stats[date])
        }
      } else {
        newData[i] = { date: date, time: 0 }
      }
    }
  }
  const [data, setData] = useState(newData)

  const goToday = () => {
    let data = []

    for (let i = 6; i >= 0; i--) {
      let date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i - today.getDay()
      ).toLocaleDateString()

      if (i > today.getDay()) {
        data[i] = { date: date, time: 0 }
      }

      storeToday(i, data, date)
      if (i < today.getDay()) {
        if (stats[date]) {
          data[i] = {
            date: date,
            time: getTime(stats[date])
          }
        } else {
          data[i] = { date: date, time: 0 }
        }
      }
    }

    setData(data)
    setFirst(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      )
    )
  }

  const showPrev = () => {
    let data = []
    let first = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() - 7
    )

    for (let i = 0; i <= 6; i++) {
      let date = new Date(
        first.getFullYear(),
        first.getMonth(),
        first.getDate() + i
      ).toLocaleDateString()

      if (stats[date]) {
        data[i] = {
          date: date,
          time: getTime(stats[date])
        }
      } else {
        data[i] = { date: date, time: 0 }
      }
      storeToday(i, data, date)
    }
    setData(data)
    setFirst(first)
  }

  const showNext = () => {
    let data = []
    let first = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate() + 7
    )

    for (let i = 0; i <= 6; i++) {
      let date = new Date(
        first.getFullYear(),
        first.getMonth(),
        first.getDate() + i
      ).toLocaleDateString()

      if (stats[date]) {
        data[i] = {
          date: date,
          time: getTime(stats[date])
        }
      } else {
        data[i] = { date: date, time: 0 }
      }
      storeToday(i, data, date)
    }
    setData(data)
    setFirst(first)
  }

  return (
    <>
      <SubTitle>
        <NavButton onClick={showPrev}>
          <img src={left} alt="prev week" />
        </NavButton>
        Использование за неделю
        <NavButton onClick={showNext}>
          <img src={right} alt="next week" />
        </NavButton>
      </SubTitle>
      <Button onClick={goToday}>Сегодня</Button>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="time" stackId="a" fill="#2196f3" />
        {/* <Bar dataKey="time" stackId="b" fill="#cccccc" /> */}
      </BarChart>
    </>
  )
}

const SubTitle = styled.h2`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`

const NavButton = styled.button`
  background-color: inherit;
  border: none;

  &:focus {
    outline: 1px solid var(--secondary__light);
  }
`

const Button = styled.button`
  width: 100px;
  height: 2em;
  font-size: 14px;
  border-radius: 8px;
  background-color: var(--primary);
  color: white;
  border: none;
  &:focus {
    outline: 1px solid #2196f3;
  }

  cursor: pointer;
`
