import React from 'react'

import { storiesOf } from '@storybook/react'

import '../../src/styles/index.css'
import style from './style.css'

import {
  Card,
  CardTitle,
  CardContent,
  CardActions,
} from '../../src/components/Card'

import Button from '../../src/components/Button'
import Input from '../../src/components/Input'
import {
  Form,
} from '../../src/containers/Form'


const validateEmail = email =>
  email.indexOf('@') > 0 && email.indexOf('.com') > 1
    ? null
    : 'Invalid e-mail address'

const required = value =>
  value && true
    ? null
    : 'This field is required'

const Validation = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle
        title="Lorem ipsum dolor sit amet"
      />
      <Form onSubmit={(data) => console.log(data)}>
        <CardContent>
          <Input path="amount" label="Amount" />
          <Form path="customer">
            <Input
              label="E-mail"
              path="email"
              validate={[required, validateEmail]}
            />
            <Form path="address">
              <Input
                path="street"
                label="Street"
                validate={required}
              />
              <Input
                path="phone"
                label="Phone"
                validate={required}
              />
            </Form>
          </Form>
        </CardContent>
        <CardActions>
          <Button type="submit">Submit</Button>
        </CardActions>
      </Form>
    </Card>
  </div>
)


storiesOf('Forms', module)
  .add(
    'Validation',
    Validation
  )
