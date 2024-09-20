"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _storage = _interopRequireDefault(require("./storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var StorageCookie = exports["default"] = /*#__PURE__*/function (_Storage) {
  function StorageCookie() {
    _classCallCheck(this, StorageCookie);
    return _callSuper(this, StorageCookie, arguments);
  }
  _inherits(StorageCookie, _Storage);
  return _createClass(StorageCookie, [{
    key: "_removeStorageState",
    value: function _removeStorageState(key) {
      // eslint-disable-next-line
      var _this$_getStorageStat = this._getStorageState(),
        value = _this$_getStorageStat[key],
        withoutProp = _objectWithoutProperties(_this$_getStorageStat, [key].map(_toPropertyKey));
      return this._setStorageState(key, withoutProp, 0);
    }
  }, {
    key: "_getStorageState",
    value: function _getStorageState(key) {
      var cookieDecoded = decodeURIComponent(document.cookie);
      var cookieArr = cookieDecoded.split('; ');
      var arrOffCookie = cookieArr.map(function (item) {
        return item.split('=');
      });
      var cookieObj = arrOffCookie.reduce(function (acc, value) {
        acc[value[0].trim()] = value[1].trim();
        return acc;
      }, {});
      return key ? cookieObj[key] : cookieObj || {};
    }
  }, {
    key: "_setStorageState",
    value: function _setStorageState(key, value) {
      var expired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.expirationPeriod;
      var date = new Date();
      date.setTime(date.getTime() + expired);
      var expires = 'expires=' + date.toUTCString();
      document.cookie = "".concat(key, "=").concat(value, "; ").concat(expires, "; path=/");
    }
  }]);
}(_storage["default"]);
//# sourceMappingURL=storage-cookie.js.map