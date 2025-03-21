import { isFunction } from 'lodash'

import config from '../../config'
import logger from '../logger'

let SINGLETON = null
let INTERVAL = null

export class TimeCorrection {

  static ATOMIC_CLOCK_URL = config.atomic_clock_url
  static AUTOCURRECT_PERIOD = 1800 // 30 min
  #correction = 0

  set correction(value) {
    value = Number(value) || 0
    if (this.#correction !== value) {
      this.#correction = value
      if (isFunction(this.onchange)) this.onchange(this.#correction)
      logger.info('Updated Time Correction', this.#correction, 'ms')
    }
  }

  constructor(onchange) {
    this.onchange = onchange
  }

  fetchUTCTime = async () => {
    try {
      const response = await window.fetch(
        TimeCorrection.ATOMIC_CLOCK_URL,
        {
          headers: {
            'accept': 'application/json, text/plain, */*',
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
          body: null,
          method: 'GET',
          mode: 'cors',
          credentials: 'omit'
        }
      )
      const data = await response.json()
      return new Date(data.dateTime+'Z').getTime()
    } catch (e) {
      logger.error(e.message)
      return null
    }
  }

  synchronizeTime = async () => {
    const start = Date.now()
    const globalTime = await this.fetchUTCTime()
    if (!globalTime) return
    const end = Date.now()
    const reqTime = end - start

    this.correction = (globalTime + reqTime) - end
  }

  // STATIC =========

  static init(onchange, cfg) {
    if (SINGLETON === null) {
      SINGLETON = new TimeCorrection(onchange)
      SINGLETON.synchronizeTime()
      INTERVAL = setInterval(
        SINGLETON.synchronizeTime,
        (Number(cfg?.autocurrect) || TimeCorrection.AUTOCURRECT_PERIOD) * 1000
      )
    } else {
      logger.warn('init was aleady called!')
    }
  }

  static sync() {
    if (SINGLETON) SINGLETON.synchronizeTime()
  }

  static abort() {
    if (INTERVAL) clearInterval(INTERVAL)
  }

}
