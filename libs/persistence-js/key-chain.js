import { castArray, get } from 'lodash'

export default class KeyChain {

  constructor (config) {
    if (!config.storageId || !config.appName || !config.storageName) {
      throw new Error('Could not initialize persistence, missing config!')
    }

    this.appName = config.appName
    this.storageId = config.storageId
    this.storageName = config.storageName
    this.resource = config.resource
    this.lifeTime = config.lifeTime || 365 //days
    this.lifeTimeMs = this.lifeTime * 24 * 60 * 60 * 1000
    this.invalidate = config.invalidate
  }

  findInvalidKeys(allKeys) {
    const decoratedKeys = this._buildDecoratedKeys(allKeys)
    const validKey = this._findValidKey(decoratedKeys)

    const invalidKeys = decoratedKeys.filter(key => (
      key.isAppKey && this._isKeyExpired(key) ||
      key.isInstanceKey && validKey !== key.key ||
      key.isInvalid
    ))

    const result = invalidKeys.map(decoratedKey => decoratedKey.key)
    return result
  }

  findValidKey(allKeys) {
    const decoratedKeys = this._buildDecoratedKeys(allKeys)
    return this._findValidKey(decoratedKeys)
  }

  _findValidKey(decoratedKeys) {
    const validKeys = decoratedKeys.filter(key =>
      key.isInstanceKey && !this._isKeyExpired(key)
    )

    const latestKey = this._getLatestKey(validKeys)
    const validKey = get(latestKey, 'key', this.generateKey())

    return validKey
  }

  getAllAppKeys(allKeys) {
    const decoratedKeys = this._buildDecoratedKeys(allKeys)
    const appKeys = decoratedKeys.filter(key => key.isAppKey)

    return appKeys.map(decoratedKey => decoratedKey.key)
  }

  generateKey() {
    return `__${this.appName}__state__${this.storageName}__${this.storageId}__${Date.now() + this.lifeTimeMs}`
  }

  _isKeyExpired(deckey) {
    return get(deckey, 'timestamp', 0) < Date.now()
  }

  _buildDecoratedKeys(allKeys){
    allKeys = allKeys || []
    const apprex = this._getAppKeyRex(allKeys)
    const insrex = this._getInstanceKeyRex()
    const invalidrexs = this._getInvalidKeysRex()
    const decoratedKeys = allKeys.map(key => ({
      key: key,
      isAppKey: apprex.test(key),
      isInstanceKey: insrex.test(key),
      isInvalid: invalidrexs.some((invalidrex) => invalidrex.test(key)),
      timestamp: +get(apprex.exec(key), 1, 0)
    }))
    return decoratedKeys
  }

  _getLatestKey(keys) {
    return keys.reduce((latest, current) =>
      get(latest, 'timestamp') > get(current, 'timestamp') ? latest : current
    , get(keys, 0))
  }

  getInstanceKeyRex(appName, storageName, storageId) {
    return new RegExp(`_${appName}__state__${storageName}__${storageId}__.*?_?_?([^_]*)$`)
  }

  _getInstanceKeyRex() {
    return this.getInstanceKeyRex(this.appName, this.storageName, this.storageId)
  }

  _getAppKeyRex() {
    return new RegExp(`_${this.appName}__state__.*?_?_?([^_]*)$`)
  }

  _getInvalidKeysRex() {
    return this.invalidate.map((key) => {
      if (key instanceof RegExp) return key
      if (typeof key === 'string') return new RegExp(key)
      if (typeof key === 'function') {
        const keys = castArray(key(this))
        return keys.map((key) => {
          if (key instanceof RegExp) return key
          if (typeof key === 'string') return new RegExp(key)
        }).filter(i => i)
      }
    }).flat()
  }
}
