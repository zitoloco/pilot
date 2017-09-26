import React from 'react'
import { storiesOf } from '@storybook/react'
import { LineTooltip } from 'react-d3-tooltip'


storiesOf('Graphs/d3', module)
  .add('line', () => {
    const chartSeries = [
      {
        field: 'refused',
        name: 'Recusadas',
        color: '#E53935',
      },
    ]

    const data = [
      {
        total: '5000',
        day: 1,
        index: 0,
      },
      {
        total: '10000',
        day: 2,
        index: 1,
      },
      {
        total: '11000',
        day: 3,
        index: 2,
      },
      {
        total: '3000',
        day: 4,
        index: 3,
      },
    ]

    const x = ({ day }) => day

    return (
      <LineTooltip
        title="Transações"
        data={data}
        chartSeries={chartSeries}
        x={x}
      />
    )
  })
