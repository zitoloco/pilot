import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Filters from '../../src/containers/Filters'

storiesOf('Filters', module)
  .add('Default', () => (
    <Filters />
  ))
