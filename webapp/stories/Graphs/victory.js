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
} from 'victory'

storiesOf('Graphs/victory', module)
.add('line', () => {
    const data1 = [
      {
        y: 1000,
        x: 1,
      },
      {
        y: 2000,
        x: 2,
      },
      {
        y: 10000,
        x: 3,
      },
      {
        y: 11000,
        x: 4,
      },
      {
        y: 4000,
        x: 5,
      },
      {
        y: 100,
        x: 6,
      },
    ]

    const data2 = [
      {
        y: 100,
        x: 1,
      },
      {
        y: 3000,
        x: 2,
      },
      {
        y: 15000,
        x: 3,
      },
      {
        y: 500,
        x: 4,
      },
    ]

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={15}
        containerComponent={<VictoryVoronoiContainer />}
      >
        <VictoryGroup
          color="#2196F3"
          labels={d => `Recusado: ${d.y}`}
          labelComponent={
            <VictoryTooltip
              style={{fontSize: 10}}
            />
          }
          data={data1}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={[
              'Dia 1',
              'Dia 2',
              'Dia 3',
              'Dia 4',
              'Dia 5',
              'Dia 6',
              'Dia 7'
            ]}
          />

          <VictoryAxis
            dependentAxis
          />

          <VictoryLine />

          <VictoryScatter
            size={(d, a) => {return a ? 8 : 3;}}
          />
        </VictoryGroup>

        <VictoryGroup
          color="#3F51B5"
          labels={d => `Autorizados: ${d.y}`}
          labelComponent={<VictoryTooltip />}
          data={data2}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={[
              'Dia 1',
              'Dia 2',
              'Dia 3',
              'Dia 4',
              'Dia 5',
              'Dia 6',
              'Dia 7'
            ]}
          />

          <VictoryAxis
            dependentAxis
          />

          <VictoryLine />

          <VictoryScatter
            size={(d, a) => {return a ? 8 : 3;}}
          />
        </VictoryGroup>
      </VictoryChart>
    )
  })
