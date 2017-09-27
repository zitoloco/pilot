import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryGroup,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryLabel,
} from 'victory'

import moment from 'moment'

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

const generateLines = () => {
  const { buckets: datesAgg } = transactions.aggregations.date

  const status = {
    paid: {
      label: 'Pagas',
      color: '#9CCC65',
      data: [],
    },
    waiting_payment: {
      label: 'Aguardando pagamento',
      color: '#FFA000',
      data: [],
    },
    authorized: {
      data: 'Autorizado',
      color: '#8D6E63',
      data: [],
    }
  }

  datesAgg.map((dateAgg) => {
    const day = moment(dateAgg.key_as_string).format('DD/MM/YY')

    Object.keys(status).forEach((key) => {
      const { total: { value } } = dateAgg[key]

      status[key].data.push({
        y: value / 100,
        x: day,
      })
    })
  })

  const a = Object.keys(status).map((key) => {
    const { label, color, data } = status[key]

    return (
      <VictoryGroup
        color={color}
        labels={d => `${label}: ${d.y}`}
        labelComponent={
          <VictoryTooltip
            style={{fontSize: 10}}
          />
        }
        data={data}
      >
        <VictoryAxis
          tickValues={datesRange()}
          tickFormat={datesRange()}
          tickLabelComponent={<VictoryLabel angle={80} style={{ fontSize: '10px', padding: '5px' }} />}
        />

        <VictoryAxis
          dependentAxis
        />

        <VictoryLine />

        <VictoryScatter
          size={(d, a) => {return a ? 8 : 3;}}
        />
      </VictoryGroup>
    )
  })

  return a
}

generateLines()

storiesOf('Graphs/victory', module)
  .add('line', () => {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={15}
        containerComponent={<VictoryVoronoiContainer />}
      >
        {generateLines()}
      </VictoryChart>
    )
  })
