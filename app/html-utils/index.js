"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlAddress = htmlAddress;
exports.htmlAddressHref = htmlAddressHref;
exports.htmlAmount = htmlAmount;
exports.htmlCounter = htmlCounter;
exports.htmlCurrency = htmlCurrency;
exports.htmlCurrencyNamed = htmlCurrencyNamed;
exports.htmlCurrentySymboled = htmlCurrentySymboled;
exports.htmlPercent = htmlPercent;
exports.htmlPercentSigned = htmlPercentSigned;
exports.htmlPricefeedRoundid = htmlPricefeedRoundid;
exports.htmlTransaction = htmlTransaction;
exports.htmlTransactionHref = htmlTransactionHref;
var _lodash = require("lodash");
var _big = _interopRequireDefault(require("big.js"));
var _config = _interopRequireDefault(require("../../config"));
var _calcUtils = require("../calc-utils");
var _currency = require("./currency");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function htmlPercentSigned(percent) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config["default"].maximum_fraction_digits_precent;
  var percentStr = htmlPercent(percent, precision);
  if (percent > 0) percentStr = '+' + percentStr;
  return percentStr;
}
function htmlPercent(percent) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config["default"].maximum_fraction_digits_precent;
  return ((0, _lodash.floor)((0, _calcUtils.mul)(percent, 100), precision) || 0) + '%';
}
function htmlCurrentySymboled(amount, quote) {
  if (isNaN(+amount)) return '';
  return _currency.CurrencyFormatter.formatSymboled(amount, quote, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  });
}
function htmlCurrencyNamed(amount, quote) {
  if (isNaN(+amount)) return '';
  return _currency.CurrencyFormatter.formatNamed(amount, quote, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  });
}
function htmlCurrency(amount) {
  var maximumFractionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config["default"].maximum_fraction_digits;
  if (isNaN(+amount)) return '';
  var HTML_LOWEST_AMOUNT = Math.pow(10, -maximumFractionDigits);
  if (!(0, _calcUtils.eq)(amount, 0) && (0, _calcUtils.lt)((0, _big["default"])(amount).abs().toString(), HTML_LOWEST_AMOUNT)) {
    if ((0, _calcUtils.gt)(amount, 0)) return "<".concat(HTML_LOWEST_AMOUNT);else return "<-".concat(HTML_LOWEST_AMOUNT);
  }
  return _currency.CurrencyFormatter.formatDefault(amount, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maximumFractionDigits
  });
}
function htmlAddress(address) {
  return (0, _lodash.toLower)(address === null || address === void 0 ? void 0 : address.replace(/(0x.{3}).*(.{5})$/, '$1...$2'));
}
function htmlCounter(counter, options) {
  var output = counter;
  if (Number(counter) > Number(options === null || options === void 0 ? void 0 : options.max)) output = options.max + '+';
  return output;
}
function htmlAddressHref(address) {
  if ((0, _lodash.isEmpty)(address)) return '#';
  return (0, _lodash.join)([_config["default"].blockchain_explorer, 'address', address], '/');
}
function htmlTransactionHref(hash) {
  if ((0, _lodash.isEmpty)(hash)) return '#';
  return (0, _lodash.join)([_config["default"].blockchain_explorer, 'tx', hash], '/');
}
function htmlAmount(number) {
  var usformatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });
  return usformatter.format(number);
}
function htmlTransaction(hash) {
  return (0, _lodash.toLower)(hash === null || hash === void 0 ? void 0 : hash.replace(/(0x.{3}).*(.{5})$/, '$1...$2'));
}
function htmlPricefeedRoundid(roundid) {
  return (0, _lodash.toLower)(roundid === null || roundid === void 0 ? void 0 : roundid.replace(/^(.{5}).*(.{5})$/, '$1...$2'));
}
//# sourceMappingURL=index.js.map