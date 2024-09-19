"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lodash = require("lodash");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var KeyChain = exports["default"] = /*#__PURE__*/function () {
  function KeyChain(config) {
    _classCallCheck(this, KeyChain);
    if (!config.storageId || !config.appName || !config.storageName) {
      throw new Error('Could not initialize persistence, missing config!');
    }
    this.appName = config.appName;
    this.storageId = config.storageId;
    this.storageName = config.storageName;
    this.resource = config.resource;
    this.lifeTime = config.lifeTime || 365; //days
    this.lifeTimeMs = this.lifeTime * 24 * 60 * 60 * 1000;
  }
  return _createClass(KeyChain, [{
    key: "findInvalidKeys",
    value: function findInvalidKeys(allKeys) {
      var _this = this;
      var decoratedKeys = this._buildDecoratedKeys(allKeys);
      var validKey = this._findValidKey(decoratedKeys);
      var invalidKeys = decoratedKeys.filter(function (key) {
        return key.isAppKey && _this._isKeyExpired(key) || key.isInstanceKey && validKey !== (0, _lodash.get)(key, 'key');
      });
      var result = invalidKeys.map(function (decoratedKey) {
        return decoratedKey.key;
      });
      return result;
    }
  }, {
    key: "findValidKey",
    value: function findValidKey(allKeys) {
      var decoratedKeys = this._buildDecoratedKeys(allKeys);
      return this._findValidKey(decoratedKeys);
    }
  }, {
    key: "_findValidKey",
    value: function _findValidKey(decoratedKeys) {
      var _this2 = this;
      var validKeys = decoratedKeys.filter(function (key) {
        return key.isInstanceKey && !_this2._isKeyExpired(key);
      });
      var latestKey = this._getLatestKey(validKeys);
      var validKey = (0, _lodash.get)(latestKey, 'key', this.generateKey());
      return validKey;
    }
  }, {
    key: "getAllAppKeys",
    value: function getAllAppKeys(allKeys) {
      var decoratedKeys = this._buildDecoratedKeys(allKeys);
      var appKeys = decoratedKeys.filter(function (key) {
        return key.isAppKey;
      });
      return appKeys.map(function (decoratedKey) {
        return decoratedKey.key;
      });
    }
  }, {
    key: "generateKey",
    value: function generateKey() {
      return "__".concat(this.appName, "__state__").concat(this.storageName, "__").concat(this.storageId, "__").concat(Date.now() + this.lifeTimeMs);
    }
  }, {
    key: "_isKeyExpired",
    value: function _isKeyExpired(deckey) {
      return (0, _lodash.get)(deckey, 'timestamp', 0) < Date.now();
    }
  }, {
    key: "_buildDecoratedKeys",
    value: function _buildDecoratedKeys(allKeys) {
      allKeys = allKeys || [];
      var apprex = this._getAppKeyRex(allKeys);
      var insrex = this._getInstanceKeyRex();
      var decoratedKeys = allKeys.map(function (key) {
        return {
          key: key,
          isAppKey: apprex.test(key),
          isInstanceKey: insrex.test(key),
          timestamp: +(0, _lodash.get)(apprex.exec(key), 1, 0)
        };
      });
      return decoratedKeys;
    }
  }, {
    key: "_getLatestKey",
    value: function _getLatestKey(keys) {
      return keys.reduce(function (latest, current) {
        return (0, _lodash.get)(latest, 'timestamp') > (0, _lodash.get)(current, 'timestamp') ? latest : current;
      }, (0, _lodash.get)(keys, 0));
    }
  }, {
    key: "_getInstanceKeyRex",
    value: function _getInstanceKeyRex() {
      return new RegExp("_".concat(this.appName, "__state__").concat(this.storageName, "__").concat(this.storageId, "__.*?_?_?([^_]*)$"));
    }
  }, {
    key: "_getAppKeyRex",
    value: function _getAppKeyRex() {
      return new RegExp("_".concat(this.appName, "__state__.*?_?_?([^_]*)$"));
    }
  }]);
}();
//# sourceMappingURL=key-chain.js.map