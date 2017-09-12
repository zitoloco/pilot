import React from 'react'
import { number, func } from 'prop-types'

import style from './style.css'


const Slider = ({ min, max, value, onChange }) => (
  <div className={style.container}>
    <label htmlFor="range" className={style.min}>
      {min}
    </label>
    <input
      id="range"
      type="range"
      className={style.range}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
    <label htmlFor="range" className={style.max}>
      {max}
    </label>
    <label htmlFor="range" className={style.value} style={{ left: value }}>
      {value}
    </label>
  </div>
)

Slider.propTypes = {
  max: number.isRequired,
  min: number.isRequired,
  value: number.isRequired,
  onChange: func,
}

Slider.defaultProps = {
  onChange: () => undefined,
}

export default Slider

