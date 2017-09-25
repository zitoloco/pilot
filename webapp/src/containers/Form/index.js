import React, { Component } from 'react'
import {
  node,
  bool,
  func,
} from 'prop-types'

import {
  ap,
  defaultTo,
  is,
  isNil,
  lensPath,
  map,
  mergeAll,
  partial,
  partialRight,
  pipe,
  reject,
  set,
  view,
  when,
} from 'ramda'


const mergeRecursive = pairs => pipe(
  mergeAll,
  map(when(is(Array), mergeRecursive))
)(pairs)

const defaultToEmptyString = defaultTo('')

export class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: {},
      values: {},
    }

    this.cloneTree = this.cloneTree.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (path, validate, event) {
    const lens = lensPath(path)

    const values = set(lens, event.target.value, this.state.values)

    if (!validate) {
      this.setState({ values })
      return
    }

    if (validate.constructor === Array) {
      const validations = reject(isNil, ap(validate, [view(lens, values)]))

      if (validations.length > 0) {
        const validation = validations[0]
        const errors = set(lens, validation, this.state.errors)

        this.setState({ errors, values })
        return
      }

      const errors = set(lens, null, this.state.errors)

      this.setState({ values, errors })
      return
    }

    const validation = validate(
      defaultToEmptyString(view(lens, values))
    )

    const errors = set(lens, validation, this.state.errors)

    this.setState({ errors, values })
  }

  cloneTree (element, index, parentPath = []) {
    if (typeof element === 'string') {
      return element
    }

    if (element.props && element.props.children) {
      const path = element.props.path
        ? [element.props.path]
        : []

      return React.cloneElement(element, {
        fieldset: true,
        children: React.Children.map(
          element.props.children,
          partialRight(this.cloneTree, [path])
        ),
      })
    }

    if (element.props.path) {
      const path = [...parentPath, element.props.path]
      const lens = lensPath(path)

      return React.cloneElement(element, {
        error: view(lens, this.state.errors),
        value: view(lens, this.state.values),
        onChange: partial(
          this.handleChange,
          [path, element.props.validate]
        ),
      })
    }

    return element
  }

  handleSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSubmit(this.state.values)
  }

  render () {
    if (this.props.fieldset) {
      return (
        <fieldset>
          {this.props.children}
        </fieldset>
      )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {React.Children.map(
          this.props.children,
          this.cloneTree
        )}
      </form>
    )
  }
}

export const Fieldset = ({ children }) => (
  <fieldset>
    {children}
  </fieldset>
)

Fieldset.propTypes = {
  children: node,
}

Fieldset.defaultProps = {
  children: null,
}

Form.propTypes = {
  children: node,
  fieldset: bool,
  onSubmit: func,
}

Form.defaultProps = {
  children: null,
  fieldset: false,
  onSubmit: () => undefined,
}
