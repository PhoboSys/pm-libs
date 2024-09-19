"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrencyFormatter = void 0;
var _lodash = require("lodash");
var _logger = _interopRequireDefault(require("../logger"));
var _CurrencyFormatter;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SYMBOLS = {
  'WETH': 'Ξ',
  'WBTC': '₿'
};
var CurrencyFormatter = exports.CurrencyFormatter = /*#__PURE__*/function () {
  function CurrencyFormatter() {
    _classCallCheck(this, CurrencyFormatter);
  }
  return _createClass(CurrencyFormatter, null, [{
    key: "formatSymboled",
    value: function formatSymboled(amount, currency, options) {
      var formatter = _get.call(CurrencyFormatter, currency, options);
      return formatter.formatSymboled(amount);
    }
  }, {
    key: "formatUnsymboled",
    value: function formatUnsymboled(amount, currency, options) {
      var formatter = _get.call(CurrencyFormatter, currency, options);
      return formatter.formatUnsymboled(amount);
    }
  }, {
    key: "formatNamed",
    value: function formatNamed(amount, currency, options) {
      var formatter = _get.call(CurrencyFormatter, currency, options);
      return formatter.formatNamed(amount);
    }
  }, {
    key: "formatDefault",
    value: function formatDefault(amount, options) {
      var formatter = _get.call(CurrencyFormatter, CurrencyFormatter.DEFAULT, options);
      return formatter.formatUnsymboled(amount);
    }
  }]);
}();
_CurrencyFormatter = CurrencyFormatter;
function _get(currency, options) {
  options = (0, _lodash.isPlainObject)(options) ? options : {};
  var key = _key.call(_CurrencyFormatter, currency, options);
  if ((0, _lodash.isEmpty)(_formatters._[key])) {
    _formatters._[key] = _create.call(_CurrencyFormatter, currency, options);
  }
  return _formatters._[key];
}
function _key(currency, options) {
  return JSON.stringify(_objectSpread({
    currency: currency
  }, options));
}
function _create(currency, options) {
  try {
    return _createStandard.call(_CurrencyFormatter, currency, options);
  } catch (_unused) {
    return _createCustom.call(_CurrencyFormatter, currency, options);
  }
}
function _createStandard(currency, options) {
  var fSymboled = new Intl.NumberFormat(Intl.Locale, _objectSpread({
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  }, options));
  var fCoded = new Intl.NumberFormat(Intl.Locale, _objectSpread({
    style: 'currency',
    currency: currency,
    currencyDisplay: 'code'
  }, options));
  var formatter = {
    formatUnsymboled: function formatUnsymboled(amount) {
      return (0, _lodash.replace)(fCoded.format(amount), new RegExp("s+".concat(currency, "s+")), '');
    },
    formatSymboled: function formatSymboled(amount) {
      return fSymboled.format(amount);
    },
    formatNamed: function formatNamed(amount) {
      return fCoded.format(amount);
    }
  };
  _logger["default"].info('Standard Currency Formatter Create: "%s"', currency);
  return formatter;
}
function _createCustom(currency, options) {
  var fDefault = new Intl.NumberFormat(undefined, _objectSpread({
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code'
  }, options));
  var formatter = {
    formatUnsymboled: function formatUnsymboled(amount) {
      return (0, _lodash.replace)(fDefault.format(amount), /\s*[$USD]+\s*/, '');
    },
    formatSymboled: function formatSymboled(amount) {
      return (0, _lodash.replace)(fDefault.format(amount), /[$USD]+/, SYMBOLS[currency] || '');
    },
    formatNamed: function formatNamed(amount) {
      return (0, _lodash.replace)(fDefault.format(amount), /[$USD]+/, currency || '');
    }
  };
  _logger["default"].info('Custom Currency Formatter Create: "%s"', currency || 'DEFAULT');
  return formatter;
}
var _formatters = {
  _: {}
};
_defineProperty(CurrencyFormatter, "DEFAULT", '');
//# sourceMappingURL=currency.js.map