import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import moment from 'moment'

import { Line, Bar } from 'react-chartjs-2'

import transactions from './transactions.json'

const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        stacked: true,
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
        },
        stacked: true,
      },
    ],
  },
}

// simulando um range de 60 dias... deve ter alguma maneira mais fácil de
// fazer isso (sorry for bad quality code, só queria algo funcionando kk)
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

const generateDefaultDataset = (label, color) => (
  {
    label,
    fill: false,
    lineTension: 0.1,
    backgroundColor: color,
    borderColor: color,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    pointBorderColor: color,
    pointBackgroundColor: color,
    pointBorderWidth: 5,
    pointBorderRadius: 4,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: color,
    pointHoverBorderWidth: 4,
    pointRadius: 5,
    poinstHitRadius: 10,
    data: [],
  }
)

const generateDataSets = () => {
  const { buckets: datesAgg } = transactions.aggregations.date

  const status = {
    paid: {
      dataset: generateDefaultDataset('Pagas', '#9CCC65'),
    },
    waiting_payment: {
      dataset: generateDefaultDataset('Aguardando pagamento', '#FFA000'),
    },
    authorized: {
      dataset: generateDefaultDataset('Autorizado', '#8D6E63'),
    }
  }

  const statusKeys = Object.keys(status)

  datesAgg.forEach((dateAgg) => {
    const date = moment(dateAgg.key_as_string).format('DD/MM/YY')

    statusKeys.forEach((key) => {
      const { total: { value } } = dateAgg[key]

      status[key].dataset.data.push({
        x: date,
        y: value/100,
      })
    })
  })

  return statusKeys.map((key) => {
    return status[key].dataset
  })
}

storiesOf('Graphs/charjs', module)
  .add('line', () => {
    const data = {
      labels: datesRange(),
      datasets: generateDataSets(),
    }

    return (
      <Line
        data={data}
        options={options}
        width={200}
        height={100}
        onElementsClick={action('ElementsClick')}
        getDatasetAtEvent={action('DatasetAtEvent')}
        getElementAtEvent={action('ElementClick')}
      />
    )
  })
  .add('stacked bar', () => {
    const data = {
      labels: datesRange(),
      datasets: generateDataSets(),
    }

    return (
      <Bar
        data={data}
        options={options}
        onElementsClick={action('ElementsClick')}
        getElementAtEvent={action('ElementClick')}
        getDatasetAtEvent={action('DatasetAtEvent')}
      />
    )
  })
