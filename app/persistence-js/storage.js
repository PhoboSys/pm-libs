"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.STORAGE_LOCAL = exports.STORAGE_COOKIE = void 0;
var _lodash = require("lodash");
var _logger = _interopRequireDefault(require("../logger"));
var _keyChain = _interopRequireDefault(require("./key-chain"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var STORAGE_LOCAL = exports.STORAGE_LOCAL = 'local';
var STORAGE_COOKIE = exports.STORAGE_COOKIE = 'cookie';
var Storage = exports["default"] = /*#__PURE__*/function () {
  function Storage(config) {
    _classCallCheck(this, Storage);
    this["default"] = {};
    this.keyChain = new _keyChain["default"](config);
  }
  return _createClass(Storage, [{
    key: "get",
    value: function get() {
      var storageKey = this._getStorageKey();
      try {
        var state = this._getStorageState(storageKey);
        return state === null ? this["default"] : JSON.parse(state);
      } catch (e) {
        _logger["default"].info('Persistence detect corrupted state, resetting to default', e);
        this._setStorageState(storageKey, JSON.stringify(this["default"]));
        return this["default"];
      }
    }
  }, {
    key: "set",
    value: function set(path, value) {
      var storageKey = this._getStorageKey();
      var state = this.get();
      try {
        var newState = value || this["default"];
        if (path) newState = (0, _lodash.set)(state, path, value);
        this._setStorageState(storageKey, JSON.stringify(newState));
      } catch (e) {
        _logger["default"].info('Storage state could not be saved!', e);

        //clean up all keys except current storage key
        this.clearStorageExceptCurrentKey(storageKey);
      }
    }
  }, {
    key: "clearStorageExceptCurrentKey",
    value: function clearStorageExceptCurrentKey(key) {
      var allKeys = this._getAllKeys();
      var allAppKeys = this.keyChain.getAllAppKeys(allKeys);
      for (var idx in allAppKeys) {
        if (key !== allAppKeys[idx]) {
          this._removeStorageState(allAppKeys[idx]);
        }
      }
    }
  }, {
    key: "storageCleanUp",
    value: function storageCleanUp() {
      var allKeys = this._getAllKeys();
      var invalidKeys = this.keyChain.findInvalidKeys(allKeys);
      for (var idx in invalidKeys) {
        this._removeStorageState(invalidKeys[idx]);
      }
    }
  }, {
    key: "_getStorageKey",
    value: function _getStorageKey() {
      var allKeys = this._getAllKeys();
      var storageKey = this.keyChain.findValidKey(allKeys);
      return storageKey;
    }
  }, {
    key: "_getAllKeys",
    value: function _getAllKeys() {
      var allKeys = [];
      for (var key in this._getStorageState()) {
        allKeys.push(key);
      }
      return allKeys;
    }
  }]);
}();
//# sourceMappingURL=storage.js.map