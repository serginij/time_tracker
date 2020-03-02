import React from 'react'
import { styled } from 'linaria/react'

import { formatTime } from '@components/main/format-time'

import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts'

import { labels } from '@components/settings/sites-list/labels'

export const StatsByLabels = ({ stats = [], sites = [] }) => {
  let max = 0

  let today = new Date()
  let byLabels = { work: 0, social: 0, hobbie: 0, relax: 0 }

  const getTime = array =>
    array.forEach(site => {
      let siteTime = formatTime(site.time)
      byLabels[site.label.id] += siteTime.hrs + siteTime.min / 60
    })

  getTime(sites)

  for (let i = 6; i >= 0; i--) {
    let date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i - today.getDay()
    ).toLocaleDateString()

    if (stats[date]) {
      getTime(stats[date])
    }
  }

  Object.values(byLabels).forEach(time => {
    if (time > max) {
      max = time
    }
  })

  const data = labels.map(label => {
    return { ...label, A: byLabels[label.id], fullMark: max }
  })
  return (
    <>
      <SubTitle>Статистика по категориям</SubTitle>
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={600}
        height={500}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={45} />
        <Radar
          name="Статистика за неделю"
          dataKey="A"
          stroke="#00569c"
          fill="#047cdc"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </>
  )
}

const SubTitle = styled.h2`
  width: 100%;
  text-align: center;
`
