import React, { Component } from 'react'
import { number } from 'prop-types'

import { storiesOf } from '@storybook/react'

import Slider from '../../src/components/Slider'


class SimpleSlider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.min,
    }
  }

  render () {
    const { min, max } = this.props

    return (
      <div>
        <Slider
          min={min}
          max={max}
          onChange={value => this.setState({ value })}
        />
      </div>
    )
  }
}

SimpleSlider.propTypes = {
  min: number.isRequired,
  max: number.isRequired,
}

storiesOf('Slider', module)
  .add('Default', () => (
    <div>
      <SimpleSlider min={10} max={100} />
    </div>
  ))
