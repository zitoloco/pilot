import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Filters from '../../src/containers/Filters'

const dateRanges = [
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
]

const filters = [
  {
    key: 'payment_method',
    name: 'Formas de pagamento',
    items: [
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
  {
    key: 'refuse_reason',
    name: 'Razão de recusa',
    items: [
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
  {
    key: 'status',
    name: 'Modelo de negócio',
    items: [
      {
        label: 'Recorrência',
        value: 'recurrence',
      },
    ],
  },
  {
    key: 'status',
    name: 'Status de transação',
    items: [
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
  {
    key: 'installments',
    name: 'Número de parcelas',
    items: [
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
  {
    key: 'card_brand',
    name: 'Bandeiras',
    items: [
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
]

storiesOf('Filters', module)
  .add('Default', () => (
    <Filters
      dateRanges={dateRanges}
      sections={filters}
    />
  ))
