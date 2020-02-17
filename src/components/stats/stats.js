import React from 'react'
import { styled } from 'linaria/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

import { formatTime } from '../main/format-time'

import left from '@assets/chevron-left.png'
import right from '@assets/chevron-right.png'

const today = [
  {
    url: 'github.com',
    time: 23,
    favicon: 'https://github.com/favicon.ico',
    date: '17/02/2020'
  },
  {
    url: 'music.yandex.ru',
    time: 14,
    favicon: 'https://music.yandex.ru/favicon.ico',
    date: '17/02/2020'
  },
  {
    url: 'extensions',
    time: 31,
    favicon: 'https://extensions/favicon.ico',
    date: '17/02/2020'
  },
  {
    url: 'trello.com',
    time: 1196,
    favicon: 'https://trello.com/favicon.ico',
    date: '17/02/2020'
  },
  {
    url: 'www.google.com',
    time: 128,
    date: '17/02/2020',
    favicon: 'https://www.google.com/favicon.ico'
  },
  {
    url: 'localhost:8000',
    time: 59,
    date: '17/02/2020',
    favicon: 'https://localhost:8000/favicon.ico'
  },
  {
    url: 'recharts.org',
    time: 9368,
    date: '17/02/2020',
    favicon: 'https://recharts.org/favicon.ico'
  },
  {
    url: 'jsfiddle.net',
    time: 4903,
    favicon: 'https://jsfiddle.net/img/favicon.png',
    date: '17/02/2020'
  }
]

const lastWeek = {
  '16/02/2020': [
    {
      tabId: 814,
      url: 'medium.com',
      time: 567,
      favicon: 'https://medium.com/favicon.ico',
      date: '16/02/2020'
    }
  ]
}

export const Stats = ({ stats = lastWeek, sites = today }) => {
  const data = []
  let today = new Date()

  for (let i = 6; i >= 0; i--) {
    if (i > today.getDay()) {
      let date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i - today.getDay()
      ).toLocaleDateString()
      data[i] = { date: date, time: 0 }
    }
    if (i == today.getDay()) {
      data[i] = {
        date: today.toLocaleDateString(),
        time: sites.reduce((acc, site) => {
          let siteTime = formatTime(site.time)
          return acc + siteTime.hrs + siteTime.min / 60
        }, 0)
      }
    }
    if (i < today.getDay()) {
      let date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i - today.getDay()
      ).toLocaleDateString()

      if (stats[date]) {
        data[i] = {
          date: date,
          time: stats[date].reduce((acc, site) => {
            let siteTime = formatTime(site.time)
            return acc + siteTime.hrs + siteTime.min / 60
          }, 0)
        }
      } else {
        let date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i - today.getDay()
        ).toLocaleDateString()
        data[i] = { date: date, time: 0 }
      }
    }
  }

  const showPrev = () => {}

  const showNext = () => {}

  return (
    <Wrapper>
      <SubTitle>
        <img src={left} alt="prev week" />
        Statistics for last week <img src={right} alt="next week" />
      </SubTitle>
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`

const SubTitle = styled.h2`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 20px;

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`
