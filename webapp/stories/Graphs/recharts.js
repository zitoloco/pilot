import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from 'recharts'

storiesOf('Graphs/recharts', module)
  .add('line', () => {
    const data = [
      {
        day: '1',
        refused: 1000,
        authorized: 100,
      },
      {
        day: '2',
        refused: 2000,
        authorized: 400,
      },
      {
        day: '3',
        refused: 10000,
        authorized: 1000,
      },
      {
        day: '4',
        refused: 9000,
        authorized: 5000,
      },
      {
        day: '5',
        refused: 500,
        authorized: 1000,
      },
      {
        day: '6',
        refused: 3000,
        authorized: 3000,
      },
      {
        day: '7',
        refused: 5000,
        authorized: 8000,
      },
    ]

    return (
      <LineChart
        data={data}
        onClick={action('Clicked')}
        width={730}
        height={250}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="refused" stroke="#e53935" />
        <Line type="monotone" dataKey="authorized" stroke="#7B1FA2" />
      </LineChart>
    )
  })
