/* eslint-disable */
import React, { Component } from 'react'

import IconArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import IconArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import IconFunnel from 'react-icons/lib/fa/filter'
import { keys, merge } from 'ramda'

import style from './style.css'

import {
  Card,
  CardTitle,
  CardContent,
} from '../../components/Card'

import DateRange from '../../components/Toolbar/DateRange'
import SearchField from '../../components/Toolbar/SearchField'

import {
  Grid,
  Row,
  Col,
} from '../../components/Grid'

import CheckboxGroup from '../../components/CheckboxGroup'


class Filters extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      showContent: true,
      dateRangeItems: [
        {
          value: 'today',
          label: 'Hoje',
        },
        {
          value: '7days',
          label: '7 dias',
        },
        {
          value: '15days',
          label: '15 dias',
        },
        {
          value: '30days',
          label: '30 dias',
        },
        {
          value: '60days',
          label: '60 dias',
        },
      ],
      selectedDate: 'hoje',
      search: '',
      filters: {
        paymentMethods: {
          name: 'Formas de pagamento',
          selected: [],
          all: [
            {
              label: 'Boleto',
              value: 'boleto',
            },
            {
              label: 'Cartão de crédito',
              value: 'credit_card',
            },
            {
              label: 'Cartão de débito',
              value: 'debit_card',
            },
            {
              label: 'Cartão de crédito estrangeiro',
              value: 'foreign_credit_card',
            },
          ],
        },
        refuseReason: {
          name: 'Razão de recusa',
          selected: [],
          all: [
            {
              label: 'Operadora de cartão',
              value: 'card_acquirer',
            },
            {
              label: 'Timeout de captura',
              value: 'capture_timeout',
            },
            {
              label: 'Antifraude',
              value: 'anti_fraud',
            },
          ],
        },
        businessModel: {
          name: 'Modelo de negócio',
          selected: [],
          all: [
            {
              label: 'Recorrência',
              value: 'recurrence',
            },
          ],
        },
        transactionStati: {
          name: 'Status de transação',
          selected: [],
          all: [
            {
              label: 'Paga',
              value: 'payed',
            },
            {
              label: 'Recusada',
              value: 'refused',
            },
            {
              label: 'Estornada',
              value: 'reversed',
            },
            {
              label: 'Estorno pendente',
              value: 'pending_reversal',
            },
            {
              label: 'Aguardando pagamento',
              value: 'waiting_payment',
            },
            {
              label: 'Processando',
              value: 'processing',
            },
            {
              label: 'Chargeback',
              value: 'chargeback',
            },
            {
              label: 'Chargeback reapresentado',
              value: 'contested_chargeback',
            },
            {
              label: 'Boleto pago com valor inferior',
              value: 'boleto_less_value',
            },
            {
              label: 'Esperando registro',
              value: 'waiting_register',
            },
            {
              label: 'Boleto pago com valor superior',
              value: 'boleto_more_value',
            },
            {
              label: 'Autorizada',
              value: 'authorized',
            },
          ],
        },
        installmentNumber: {
          name: 'Número de parcelas',
          selected: [],
          all: [
            {
              label: '1x',
              value: '1',
            },
            {
              label: '2x',
              value: '2',
            },
            {
              label: '3x',
              value: '3',
            },
            {
              label: '4x',
              value: '4',
            },
            {
              label: '5x',
              value: '5',
            },
            {
              label: '6x',
              value: '6',
            },
            {
              label: '7x',
              value: '7',
            },
            {
              label: '8x',
              value: '8',
            },
            {
              label: '9x',
              value: '9',
            },
            {
              label: '10x',
              value: '10',
            },
            {
              label: '11x',
              value: '11',
            },
            {
              label: '12x',
              value: '12',
            },
          ],
        },
        cardBrands: {
          name: 'Bandeiras',
          selected: [],
          all: [
            {
              label: 'Visa',
              value: 'visa',
            },
            {
              label: 'Elo',
              value: 'elo',
            },
            {
              label: 'Aura',
              value: 'aura',
            },
            {
              label: 'Amex',
              value: 'amex',
            },
            {
              label: 'Discover',
              value: 'discover',
            },
            {
              label: 'Mastercard',
              value: 'mastercard',
            },
            {
              label: 'Hipercard',
              value: 'hipercard',
            },
            {
              label: 'JCB',
              value: 'jcb',
            },
            {
              label: 'Diners',
              value: 'diners',
            },
          ],
        },
      },
    }

    this.handleVisibility = this.handleVisibility.bind(this)
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this)
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
    this.handleChangePaymentMethods = this.handleChangePaymentMethods.bind(this)
  }

  handleVisibility () {
    this.setState({ showContent: !this.state.showContent })
  }

  handleDateRangeChange (selectedDate) {
    this.setState({ selectedDate })
  }

  handleSearchFieldChange (search) {
    this.setState({ search })
  }

  handleChangePaymentMethods (index, values) {
    this.setState({
      [`selectedPaymentMethods${index}`]: values,
    })
  }

  render () {
    const {
      showContent,
    } = this.state

    return (
      <Card>
        <CardTitle
          title="Filtros"
          icon={<IconFunnel />}
          onClick={this.handleVisibility}
        >
          {showContent &&
            <IconArrowUp />
          }

          {!showContent &&
            <IconArrowDown />
          }
        </CardTitle>

        <CardContent>
          <Grid>
            <Row flex>
              <Col>
                <DateRange
                  items={this.state.dateRangeItems}
                  onChange={this.handleDateRangeChange}
                  selected={this.state.selectedDate}
                />
              </Col>
              <Col alignEnd>
                <SearchField
                  value={this.state.search}
                  onChange={this.handleSearchFieldChange}
                />
              </Col>
            </Row>

            {showContent &&
              <Row>
                {keys(this.state.filters).map(filter => (
                  <Col palm={12} tablet={6} desk={4} tv={4} key={filter}>
                    <h4 className={style.heading}>{this.state.filters[filter].name}</h4>
                    <Row>
                      <CheckboxGroup
                        options={this.state.filters[filter].all}
                        name={filter}
                        onChange={function (values) {
                          const newValues = merge(
                            this.state.filters[filter],
                            { selected: values }
                          )
                          
                          const state = {
                            filters: merge(
                              this.state.filters,
                              { [filter]: newValues }
                            ),
                          }
                          
                          this.setState(state)
                          
                        }.bind(this)}
                        values={this.state.filters[filter].selected}
                      />
                    </Row>
                  </Col>
                ))}
              </Row>
            }
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

export default Filters
