import React from 'react'
import { shallow } from 'enzyme'

import Slider from './index'

describe('Switch', () => {
  const onChange = jest.fn()

  const component = shallow(
    <Slider
      start={0}
      end={100}
      onChange={onChange}
    />
  )

  it('should trigger onChange', () => {
    component.find('input').simulate('change')
    expect(onChange).toHaveBeenCalled()
  })
})
