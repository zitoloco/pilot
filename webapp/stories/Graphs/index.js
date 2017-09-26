import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Line } from 'react-chartjs-2'

storiesOf('Graphs/charjs', module)
  .add('line', () => {
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
            }
          },
        ],
      },
    }

    const data = {
      labels: ['01', '02', '03', '04', '05', '06', '07'],
      datasets: [
        {
          label: 'Recusadas',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#2196F3',
          borderColor: '#673AB7',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#3F51B5',
          pointBackgroundColor: '#9FA8DA',
          pointBorderWidth: 5,
          pointBorderRadius: 4,
          pointHoverBackgroundColor: '#3F51B5',
          pointHoverBorderColor: '#3F51B5',
          pointHoverBorderWidth: 4,
          pointRadius: 5,
          poinstHitRadius: 10,
          data: [12000, 15000, 5000, 400, 8000, 10000, 9000],
        },
        {
          label: 'Estornadas',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#C62828',
          borderColor: '#C62828',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#64FFDA',
          pointBackgroundColor: '#64FFDA',
          pointBorderWidth: 5,
          pointBorderRadius: 4,
          pointHoverBackgroundColor: '#64FFDA',
          pointHoverBorderColor: '#64FFDA',
          pointHoverBorderWidth: 4,
          pointRadius: 5,
          poinstHitRadius: 10,
          data: [1000, 1500, 1000, 4000, 9000, 600, 1000],
        },
      ],
    }

    return (
      <Line
        data={data}
        options={options}
        width={500}
        height={500}
        onElementsClick={action('Clicked')}
      />
    )
  })
