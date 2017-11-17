import React from 'react'
import { storiesOf } from '@storybook/react'
import Toolbar from '../../src/components/Toolbar'
import Pagination from '../../src/components/Toolbar/Pagination'

class PaginationState extends React.Component {
  constructor (props) {
    super(props)
    const {
      currentPage,
      totalPages,
      inputError,
    } = props
    this.state = {
      currentPage: currentPage || 1,
      totalPages: totalPages || 10,
      inputError: !!inputError,
    }

    this.pageChanged = this.pageChanged.bind(this)
    this.changeTotalPages = this.changeTotalPages.bind(this)
    this.handleInputError = this.handleInputError.bind(this)
  }

  pageChanged (page) {
    this.setState({
      currentPage: page,
    })
  }

  changeTotalPages (event) {
    const { valueAsNumber: value } = event.target
    this.setState({
      totalPages: value > 0 && value < 999999999 ? value : this.state.totalPages,
      currentPage: 1,
    })
  }

  handleInputError (inputError) {
    this.setState({
      inputError,
    })
  }

  render () {
    return (
      <div style={{ padding: '10px' }}>
        <Toolbar>
          <Pagination
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            onPageChange={this.pageChanged}
            onError={this.handleInputError}
            error={this.state.inputError}
          />
        </Toolbar>
        {this.state.inputError &&
          <p>Epic fail!</p>
        }
        <p>Current page: {this.state.currentPage}</p>
        <label htmlFor="totalPages" > Pages: </label>
        <br />
        <input
          id="totalPages"
          type="number"
          value={this.state.totalPages}
          onChange={this.changeTotalPages}
          max={999999999}
          min={1}
        />
      </div>
    )
  }
}

storiesOf('Toolbar', module)
  .add('Pagination', () =>(
    <div>
      <h1>Pagination usage</h1>

      <section>
        <h2>Single page</h2>
        <PaginationState
          currentPage={1}
          totalPages={1}
        />
      </section>

      <section>
        <h2>First page</h2>
        <PaginationState
          currentPage={1}
          totalPages={10}
        />
      </section>

      <section>
        <h2>Intermediate page</h2>
        <PaginationState
          currentPage={5}
          totalPages={10}
        />
      </section>

      <section>
        <h2>Last page</h2>
        <PaginationState
          currentPage={10}
          totalPages={10}
        />
      </section>

      <section>
        <h2>Wrong page</h2>
        <PaginationState
          currentPage={2}
          totalPages={1}
        />
      </section>

    </div>
  ))
