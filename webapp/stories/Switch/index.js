import React, { Component } from 'react'
import propTypes from 'prop-types'

import { storiesOf } from '@storybook/react'

import Switch from '../../src/components/Switch'

import style from './style.css'


class SwitchState extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.checked,
    }
  }

  render () {
    return (
      <Switch
        disabled={this.props.disabled}
        checked={this.state.value}
        onChange={value => this.setState({ value })}
      />
    )
  }
}

SwitchState.propTypes = {
  checked: propTypes.bool,
  disabled: propTypes.bool,
}

SwitchState.defaultProps = {
  checked: false,
  disabled: false,
}

storiesOf('Switch', module)
  .add('All styles', () => (
    <div className={style.container}>
      <section>
        <pre>Hello, this line must break visual-tests :)</pre>
        <h2>Enabled</h2>
        <p>Checked</p>
        <SwitchState checked />
        <p>Unchecked</p>
        <SwitchState checked={false} />
      </section>
      <section>
        <h2>Disabled</h2>
        <p>Checked</p>
        <SwitchState disabled checked />
        <p>Unchecked</p>
        <SwitchState disabled checked={false} />
      </section>
    </div>
  ))

