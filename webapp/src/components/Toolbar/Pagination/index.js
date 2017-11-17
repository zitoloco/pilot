import React from 'react'
import PropTypes from 'prop-types'
import {
  F,
  T,
  always,
  allPass,
  anyPass,
  and,
  inc,
  dec,
  cond,
  ifElse,
  pipe,
  clamp,
  equals,
  isNil,
  isEmpty,
  lte,
  lt,
  gt,
  gte,
  is,
  prop,
  objOf,
  unless,
  when,
  toString,
  length,
  tail,
  path as rPath,
  head,
  propSatisfies,
  complement,
} from 'ramda'
import classNames from 'classnames'

import ArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import ArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

import style from './style.css'

const convertToNumber = unless(anyPass([isNil, isEmpty]), Number)

const createState = pipe(
  convertToNumber,
  objOf('inputPage')
)

const preventInvalidKeys = (event) => {
  const regex = /([0-9])\w+/
  if (!regex.match(event.key)) {
    event.preventDefault()
  }
}

class Pagination extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      inputPage: null,
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.getCurrentPage = this.getCurrentPage.bind(this)
    this.goTo = this.goTo.bind(this)
    this.submitInput = this.submitInput.bind(this)
    this.calculateInputValue = this.calculateInputValue.bind(this)
    this.disableButton = this.disableButton.bind(this)
  }

  onInputChange (event) {
    event.preventDefault()

    const {
      totalPages,
      onError,
    } = this.props

    const { value: newPage } = event.target
    const getLength = pipe(toString, length)

    const hasValidLength = pipe(
      length,
      gte(getLength(totalPages))
    )

    const startsWithZero = allPass([
      pipe(length, equals(2)),
      pipe(head, equals('0')),
    ])

    const hasError = pipe(
      anyPass([
        gt(0),
        lt(totalPages),
      ]),
      and(newPage)
    )

    const tailIfNeeded = pipe(
      when(startsWithZero, tail),
      createState
    )

    const handleError = pipe(
      Number,
      hasError,
      onError
    )

    if (hasValidLength(newPage)) {
      this.setState(tailIfNeeded(newPage))
      handleError(newPage)
    }
  }

  getCurrentPage () {
    const {
      totalPages,
      onPageChange,
      currentPage,
      onError,
    } = this.props

    const { inputPage } = this.state

    this.setState({
      inputPage: null,
    })

    const isValidCurrentPage = allPass([
      propSatisfies(is(Number), 'currentPage'),
      propSatisfies(complement(is(Number)), 'inputPage'),
    ])

    const isValidInput = pipe(
      prop('inputPage'),
      anyPass([
        lt(totalPages),
        gt(1),
      ])
    )

    const getCorrectPage = cond([
      [isValidCurrentPage, always(currentPage)],
      [isValidInput, always(currentPage)],
      [T, always(inputPage)],
    ])

    onPageChange(getCorrectPage({ currentPage, inputPage }))

    onError(false)
  }

  goTo (path) {
    const {
      currentPage,
      totalPages,
      onPageChange,
    } = this.props

    const range = clamp(1, totalPages)

    const calculateNewPage = ifElse(
      equals('next'),
      always(inc(currentPage)),
      always(dec(currentPage))
    )

    const newPage = pipe(
      calculateNewPage,
      range
    )

    onPageChange(newPage(path))
  }

  calculateInputValue () {
    const { inputPage } = this.state
    const { currentPage } = this.props

    const calculateValue = ifElse(
      equals(''),
      always(''),
      when(
        anyPass([isNil, isEmpty]),
        always(currentPage)
      )
    )

    return `${calculateValue(inputPage)}`
  }

  disableButton (path) {
    const { currentPage, totalPages } = this.props
    const { inputPage } = this.state

    const isDisable = anyPass([
      isNil,
      gt(0),
      lt(totalPages),
    ])

    const isInvalidInput = allPass([
      convertToNumber,
      lt(totalPages),
    ])

    if (isDisable(currentPage) || isInvalidInput(inputPage)) {
      return true
    }

    if (path === 'prev') {
      if (inputPage) {
        return inputPage <= 1
      }

      return currentPage <= 1
    }

    if (inputPage) {
      return inputPage >= totalPages
    }

    return currentPage >= totalPages
  }

  submitInput (event) {
    const { totalPages } = this.props

    const isAllowedKey = pipe(
      prop('key'),
      equals('Enter')
    )

    const isValidInput = pipe(
      rPath(['target', 'value']),
      Number,
      allPass([gte(totalPages), lte(1)])
    )

    const validateSubmit = ifElse(
      allPass([isAllowedKey, isValidInput]),
      this.getCurrentPage,
      F
    )

    validateSubmit(event)
  }

  render () {
    const {
      totalPages,
      error,
    } = this.props

    const paginationClasses = classNames(style.pagination, {
      [style.paginationError]: error,
    })

    const displayClasses = classNames(style.display, {
      [style.displayError]: error,
    })

    return (
      <div className={paginationClasses}>
        <button
          size="extra-small"
          onClick={() => this.goTo('prev')}
          disabled={this.disableButton('prev')}
          className={classNames(style.button, style.prev)}
        >
          <ArrowLeft size={13} viewBox="10 10 20 20" />
        </button>

        <div className={displayClasses}>
          <span
            className={style.bigChild}
            style={{ width: `${(totalPages.toString().length / 2)}em` }}
          >
            <input
              type="number"
              min={1}
              max={totalPages}
              value={this.calculateInputValue()}
              onChange={this.onInputChange}
              onBlur={this.getCurrentPage}
              onKeyDown={this.submitInput}
              onKeyPress={preventInvalidKeys}
              className={style.input}
              maxLength={2}
            />
          </span>
          <span className={style.smallChild}>de</span>
          <span
            className={style.bigChild}
            style={{ width: `${(totalPages.toString().length / 2)}em` }}
          >
            {totalPages}
          </span>
        </div>

        <button
          size="extra-small"
          onClick={() => this.goTo('next')}
          disabled={this.disableButton('next')}
          className={classNames(style.button, style.next)}
        >
          <ArrowRight size={13} viewBox="10 10 20 20" />
        </button>
      </div>
    )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onError: PropTypes.func,
  error: PropTypes.bool,
}

Pagination.defaultProps = {
  onError: () => null,
  error: false,
}

export default Pagination
