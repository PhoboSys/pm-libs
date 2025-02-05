import { JsonRpcProvider, Network as network, FetchRequest, dataLength } from 'ethers'

import logger from '@libs/logger'

import { NETWORK_URLS, NETWORK } from './constants'

class RpcUrlsLocalStorage {
  static localStoragePath = '__rpc-requests-statistics'
  static localStorageVersion = 'v6'

  read() {
    const data = JSON.parse(window.localStorage.getItem(RpcUrlsLocalStorage.localStoragePath) || '{}')

    if (data && data.urls && data.version === RpcUrlsLocalStorage.localStorageVersion) {
      for (const url in data.urls) {
        const urldata = data.urls[url]
        if (urldata.successRate) urldata.successRate = this.#fromPercent2Decimal(urldata.successRate)
        if (urldata.lastSuccessAt) urldata.lastSuccessAt = this.#fromDate2Timestamp(urldata.lastSuccessAt)
        if (urldata.lastFailAt) urldata.lastFailAt = this.#fromDate2Timestamp(urldata.lastFailAt)
      }
      return data
    }

    this.delete()

    return {
      urls: {},
      version: RpcUrlsLocalStorage.localStorageVersion,
    }
  }

  update(urls) {
    urls = urls.reduce((acc, url_data) => {
      const data = { ...url_data }

      delete data.url

      if (data.successRate) data.successRate = this.#fromDecimal2Percent(data.successRate)
      if (data.lastSuccessAt) data.lastSuccessAt = this.#fromTimestamp2Date(data.lastSuccessAt)
      if (data.lastFailAt) data.lastFailAt = this.#fromTimestamp2Date(data.lastFailAt)

      if (Object.keys(data).length) acc[url_data.url] = data

      return acc
    }, {})

    window.localStorage.setItem(RpcUrlsLocalStorage.localStoragePath, JSON.stringify({
      version: RpcUrlsLocalStorage.localStorageVersion,
      urls,
    }))
  }

  delete() {
    localStorage.removeItem(RpcUrlsLocalStorage.localStoragePath)
  }

  #fromDecimal2Percent(decimal) { return decimal*100 + '%' }
  #fromPercent2Decimal(percent) { return (+(String(percent).split('%')[0]))/100 }
  #fromDate2Timestamp(date) { return Date.parse(date) }
  #fromTimestamp2Date(timestamp) { return new Date(timestamp).toString() }
}

class RpcUrls {

  static lockDurationMs = 1 * 60 * 60 * 1000 // 1 hour
  static maxErrorsLimit = 20
  static minRequestsForLock = 10
  static minSuccessRate = 0.70

  constructor(urls, persisted) {
    this.persisted = persisted
    this.urls = this.#withPersisted(urls.map((url) => ({ url })))
  }

  get urls_unlocked() {
    return this.urls.filter((_, index) => !this.#isLocked(index))
  }

  getUrl() {

    if (this.urlIndex === undefined) this.urlIndex = 0
    else this.urlIndex = (this.urlIndex + 1) % this.urls.length

    let passed = 0
    while (this.#isLocked(this.urlIndex) && passed !== this.urls.length) {
      passed++
      this.urlIndex = (this.urlIndex + 1) % this.urls.length
    }

    return this.urls[this.urlIndex].url

  }

  success(url) {
    const index = this.urls.findIndex((url_data) => url_data.url === url)
    if (index !== -1) {
      this.urls[index].successTotal = (this.urls[index].successTotal || 0) + 1
      this.urls[index].lastSuccessAt = new Date().getTime()
      this.#updateRates(index)
      this.persisted.update(this.urls)
    }
  }

  fail(url, error) {
    const index = this.urls.findIndex((url_data) => url_data.url === url)
    if (index !== -1) {
      this.urls[index].errors = [...(this.urls[index].errors || []), error]
      this.urls[index].lastFailAt = new Date().getTime()
      this.urls[index].failedTotal = (this.urls[index].failedTotal || 0) + 1
      if (this.urls[index].errors.length > RpcUrls.maxErrorsLimit) this.urls[index].errors.shift()
      this.#updateRates(index)
      this.persisted.update(this.urls)
    }
  }

  #isLocked(index) {

    const successTotal = this.urls[index].successTotal || 0
    const failedTotal = this.urls[index].failedTotal || 0
    const successRate = this.urls[index].successRate
    const lastFailAt = this.urls[index].lastFailAt

    const isSuccessRateLow = successRate < RpcUrls.minSuccessRate
    const isEnoughRequestsForLock = (successTotal + failedTotal) >= RpcUrls.minRequestsForLock
    const hasFail = !!lastFailAt
    const notLongAgoFailed = new Date().getTime() - lastFailAt < RpcUrls.lockDurationMs

    return isEnoughRequestsForLock && isSuccessRateLow && hasFail && notLongAgoFailed
  }

  #updateRates(index) {
    let successTotal = this.urls[index].successTotal || 0
    let failedTotal = this.urls[index].failedTotal || 0

    if (
      successTotal % 2 === 0 &&
      failedTotal % 2 === 0 &&
      (successTotal/2 + failedTotal/2) >= RpcUrls.minRequestsForLock
    ) {
      this.urls[index].successTotal = successTotal = successTotal/2
      this.urls[index].failedTotal = failedTotal = failedTotal/2
    }

    const total = successTotal + failedTotal

    let successRate
    if (total === 0) successRate = 0
    else if (successTotal === 0) successRate = 0
    else if (failedTotal === 0) successRate = 1
    else successRate = Math.floor((successTotal/total)*100)/100
    this.urls[index].successRate = successRate
  }

  #withPersisted(urls) {
    const persisted = this.persisted.read()
    return urls.map((url_data) => {
      const persisted_url_data = persisted.urls[url_data.url] || {}
      return { ...url_data, ...persisted_url_data }
    })
  }

}

class PM_FetchRequest extends FetchRequest {

  constructor(rpc_urls) {
    super()
    super.getUrlFunc = this.getUrlFunc.bind(this)
    super.setThrottleParams({ maxAttempts: 1, slotInterval: 250 })

    this.rpc_urls = rpc_urls
    this.makeRequest = FetchRequest.createGetUrlFunc({}) // Could be any other custom fetcher
  }

  /**
   *  Function which makes/retries requests to rpc distributed endpoints.
   */
  async getUrlFunc(req, signal, requested = []) {

    req.url = this.rpc_urls.getUrl()

    if (requested.length) {

      while (
        req.url &&
        requested.includes(req.url) &&
        requested.length < this.rpc_urls.urls_unlocked.length
      ) {
        req.url = this.rpc_urls.getUrl()
      }

      const plural = requested.length > 1
      logger.warn(
        'Attempt to request %s. Previous attempt%s %s to: %s.',
        req.url,
        plural ? 's' : '',
        plural ? 'were' : 'was',
        requested.join(', '),
      )
    }

    try {

      const res = await this.makeRequest(req, signal)

      this.validateResponse(res)

      this.rpc_urls.success(req.url)

      return res

    } catch (e) {

      logger.warn('Request to %s failed. %s', req.url, e)

      requested.push(req.url)

      const canRetry = requested.length < this.rpc_urls.urls_unlocked.length && window.navigator?.onLine

      this.rpc_urls.fail(req.url, e.toString())

      if (canRetry) return this.getUrlFunc(req, signal, requested)
      else logger.warn('Request was aborted cause all attempts were used. Attempted:', requested.join(', '))

      throw e

    }
  }

  /**
   *  Throws an error if response is not ok.
   */
  validateResponse(response) {
    const statusCodeSuccess = response.statusCode >= 200 && response.statusCode < 300
    const body = JSON.parse(new TextDecoder().decode(response.body))

    if (body.result === '0x') body.error = 'BAD_DATA (value="0x")'

    if (statusCodeSuccess && !body.error) return

    let message = ''
    if (body.error) message = `${message} ${this.#errorToString(body.error)}`.trim()
    if (response.statusCode) message = `${message} statusCode=${response.statusCode}`.trim()
    if (response.statusMessage) message = `${message} statusMessage=${response.statusMessage}`.trim()

    throw new Error(message.trim())
  }

  /**
   *  Stringify error.
   */
  #errorToString(error) {
    let errorString = ''

    if (error) {

      if (typeof error === 'string') {

        errorString = error

      } else if (typeof error === 'number') {

        errorString = `${error}`

      } else if (Array.isArray(error)) {

        errorString = error
          .map((e) => this.#errorToString(e))
          .join(', ')

      } else if (typeof error === 'object' && error !== null) {

        errorString = Object.keys(error)
          .map((key) => `${key}=${this.#errorToString(error[key])}`)
          .join(' ')

      }
    }

    return errorString.trim()
  }

}

export const DEFAULT_WEB3_PROVIDER = new JsonRpcProvider(
  new PM_FetchRequest(
    new RpcUrls(
      NETWORK_URLS.READ[NETWORK],
      new RpcUrlsLocalStorage()
    )
  ),
  network.from(NETWORK),
  {
    staticNetwork: network.from(NETWORK),
    batchMaxCount: 1
  }
)
