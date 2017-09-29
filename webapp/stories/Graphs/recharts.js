import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'

import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts'

import transactions from './transactions.json'

const datesRange = () => {
  let currentDate = moment('2017-07-27T03:00:00.000Z')
  const end = moment('2017-09-27T03:00:00.000Z')

  const dates = []

  while (currentDate <= end) {
    dates.push(moment(currentDate).format('DD/MM/YY'))
    currentDate = moment(currentDate).add(1, 'days')
  }

  return dates
}

const generateDataSets = () => {
  const { buckets: datesAgg } = transactions.aggregations.date

  const status = ['paid', 'authorized', 'waiting_payment']

  const a = datesAgg.map((dateAgg) => {
    const day = moment(dateAgg.key_as_string).format('DD/MM/YY')

    const obj = {
      day,
    }

    status.forEach((key) => {
      const { total: { value } } = dateAgg[key]
      obj[key] = value / 100
    })

    return obj
  })

  return a
}

storiesOf('Graphs/recharts', module)
  .add('line', () => {
    return (
      <LineChart
        data={generateDataSets()}
        onClick={action('Clicked')}
        width={730}
        height={250}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="day" ticks={datesRange()} interval={2} />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="paid" stroke="#9CCC65" onClick={action('Clicked paid')} />
        <Line type="monotone" dataKey="waiting_payment" stroke="#FFA000" />
        <Line type="monotone" dataKey="authorized" stroke="#8D6E63" />
      </LineChart>
    )
  })
  .add('stacked', () => {
    return (
      <BarChart
        data={generateDataSets()}
        width={730}
        height={250}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        onClick={action('Clicked')}
      >
        <XAxis dataKey="day" ticks={datesRange()} interval={2} />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar stackId="a" dataKey="paid" fill="#9CCC65" onClick={action('Clicked paid')} />
        <Bar stackId="a" dataKey="waiting_payment" fill="#FFA000" />
        <Bar stackId="a" dataKey="authorized" fill="#8D6E63" />
      </BarChart>
    )
  })
