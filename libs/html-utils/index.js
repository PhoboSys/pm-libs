import { floor, join, isEmpty, toLower } from 'lodash'
import Big from 'big.js'

import config from '@config'

import { round, eq, lt, mul } from '../calc-utils'
import { CurrencyFormatter } from './currency'

function normalizeToMinimumAmount(amount = 0, precision) {
  const HTML_LOWEST_AMOUNT = Math.pow(10, -(precision))

  if (!eq(amount, 0) && lt(Big(amount).abs().toString(), HTML_LOWEST_AMOUNT)) {
    return { lowest: true, amount: HTML_LOWEST_AMOUNT, negative: lt(amount, 0) }
  }
  
  return { lowest: false, amount, negative: lt(amount, 0) }
}

export function htmlPercentSigned(percent, options) {
  let percentStr = htmlPercent(percent, options)
  if (percent > 0) percentStr = '+' + percentStr
  return percentStr
}

export function htmlPercent(percent, { precision = config.maximum_fraction_digits_precent, threshold = false } = {}) {

  let formatted = mul(percent, 100)

  if (threshold) {
    const normalized = normalizeToMinimumAmount(formatted, precision)
    formatted = round(normalized.amount, precision, 0) || 0
    formatted = normalized.lowest ? `<${formatted}` : formatted
    formatted = normalized.lowest && normalized.negative ? `-${formatted}` : formatted
  } else {
    formatted = round(formatted, precision, 0) || 0
  }

  return formatted + '%'
}

export function htmlCurrencySymboled(amount, quote, { maxPrecision = config.maximum_fraction_digits, threshold = false } = {}) {
  if (isNaN(+amount)) return ''

  let formatted = amount

  if (threshold) {
    const normalized = normalizeToMinimumAmount(formatted, maxPrecision)

    formatted = CurrencyFormatter.formatSymboled(normalized.amount, quote, {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxPrecision,
      roundingMode: 'trunc',
    })

    formatted = normalized.lowest ? `<${formatted}` : formatted
    formatted = normalized.lowest && normalized.negative ? `-${formatted.split('-').join('')}` : formatted 
  } else {
    formatted = CurrencyFormatter.formatSymboled(formatted, quote, {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxPrecision,
      roundingMode: 'trunc',
    })
  }

  return formatted
}

export function htmlCurrencyNamed(amount, quote, { maxPrecision = config.maximum_fraction_digits, threshold = false } = {}) {
  if (isNaN(+amount)) return ''

  let formatted = amount

  if (threshold) {
    const normalized = normalizeToMinimumAmount(formatted, maxPrecision)

    formatted = CurrencyFormatter.formatNamed(normalized.amount, quote, {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxPrecision,
      roundingMode: 'trunc',
    })

    formatted = normalized.lowest ? `<${formatted}` : formatted
    formatted = normalized.lowest && normalized.negative ? `-${formatted.split('-').join('')}` : formatted
  } else {
    formatted = CurrencyFormatter.formatNamed(formatted, quote, {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxPrecision,
      roundingMode: 'trunc',
    })
  }

  return formatted
}

export function htmlCurrency(amount, { maxPrecision = config.maximum_fraction_digits, threshold = false } = {}) {
  if (isNaN(+amount)) return ''

  let formatted = amount

  if (threshold) {
    const normalized = normalizeToMinimumAmount(formatted, maxPrecision)

    formatted = CurrencyFormatter.formatDefault(normalized.amount, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxPrecision,
      roundingMode: 'trunc',
    })
  
    formatted = normalized.lowest ? `<${formatted}` : formatted
    formatted = normalized.lowest && normalized.negative ? `-${formatted.split('-').join('')}` : formatted
  } else {
    formatted = CurrencyFormatter.formatDefault(formatted, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxPrecision,
      roundingMode: 'trunc',
    })
  }

  return formatted
}

export function htmlAddress(address) {
  return toLower(address?.replace(/(0x.{3}).*(.{5})$/, '$1...$2'))
}

export function htmlCounter(counter, options) {
  let output = counter

  if (Number(counter) > Number(options?.max)) output = options.max + '+'

  return output
}

export function htmlAddressHref(address) {
  if (isEmpty(address)) return '#'

  return join([config.blockchain_explorer, 'address', address], '/')
}

export function htmlTransactionHref(hash) {
  if (isEmpty(hash)) return '#'

  return join([config.blockchain_explorer, 'tx', hash], '/')
}

export function htmlAmount(number) {
  const usformatter = Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' })
  return usformatter.format(number)
}

export function htmlTransaction(hash) {
  return toLower(hash?.replace(/(0x.{3}).*(.{5})$/, '$1...$2'))
}

export function htmlPricefeedRoundid(roundid) {
  return toLower(roundid?.replace(/^(.{5}).*(.{5})$/, '$1...$2'))
}
