"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_INT_256 = void 0;
exports.actualProfit = actualProfit;
exports.actualProfitPercent = actualProfitPercent;
exports.actualReturn = actualReturn;
exports.add = add;
exports.div = div;
exports.dividends = dividends;
exports.eq = eq;
exports.fromDecimal = fromDecimal;
exports.fromDecimalERC20 = fromDecimalERC20;
exports.fromDecimalPricefeed = fromDecimalPricefeed;
exports.futureDividends = futureDividends;
exports.futureProfit = futureProfit;
exports.futureProfitPercent = futureProfitPercent;
exports.futureReturn = futureReturn;
exports.gt = gt;
exports.gte = gte;
exports.isNegative = isNegative;
exports.isPositive = isPositive;
exports.lt = lt;
exports.lte = lte;
exports.max = max;
exports.min = min;
exports.minmax = minmax;
exports.mul = mul;
exports.percent = percent;
exports.profitPercent = profitPercent;
exports.round = round;
exports.roundERC20 = roundERC20;
exports.sub = sub;
exports.toDecimal = toDecimal;
exports.toDecimalERC20 = toDecimalERC20;
exports.toDecimalGas = toDecimalGas;
exports.toDecimalPricefeed = toDecimalPricefeed;
exports.toEnumeration = toEnumeration;
var _lodash = require("lodash");
var _big = _interopRequireDefault(require("big.js"));
var _constants = require("../../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
_big["default"].PE = 1e+6;
var TEN = (0, _big["default"])(10);
var ONE = (0, _big["default"])(1);
var ZERO = (0, _big["default"])(0);
var VIGORISH = (0, _big["default"])(0.01);
var MAX_INT_256 = exports.MAX_INT_256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
function minmax(data) {
  if (!(0, _lodash.isArray)(data)) return [0, 0];
  var _data = _slicedToArray(data, 1),
    minimum = _data[0];
  var _data2 = _slicedToArray(data, 1),
    maximum = _data2[0];
  var _iterator = _createForOfIteratorHelper(data),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (item < minimum) minimum = item;
      if (item > maximum) maximum = item;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return [minimum, maximum];
}
function __inNotZeroNumbers() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  for (var _i = 0, _args = args; _i < _args.length; _i++) {
    var num = _args[_i];
    if (!Number(num)) return false;
  }
  return true;
}
function __inNumbers() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  for (var _i2 = 0, _args2 = args; _i2 < _args2.length; _i2++) {
    var num = _args2[_i2];
    if (num === '' || isNaN(Number(String(num))) || !(0, _lodash.isNumber)(Number(String(num)))) return false;
  }
  return true;
}
function __futureReturn(prizefunds, wager) {
  var _prizefunds;
  if (!__inNotZeroNumbers((_prizefunds = prizefunds) === null || _prizefunds === void 0 ? void 0 : _prizefunds[_constants.PRIZEFUNDS.TOTAL], wager)) return (0, _lodash.mapValues)(prizefunds, function () {
    return ZERO;
  });
  wager = (0, _big["default"])(wager);
  prizefunds = (0, _lodash.mapValues)(prizefunds, function (prizefund) {
    return (0, _big["default"])(prizefund);
  });
  var result = {};
  for (var position in prizefunds) {
    result[position] = wager.plus(prizefunds[_constants.PRIZEFUNDS.TOTAL]).times(wager.div(wager.plus(prizefunds[position]))).times(ONE.minus(VIGORISH));
  }
  return result;
}
function futureReturn(prizefunds, wager) {
  return (0, _lodash.mapValues)(__futureReturn(prizefunds, wager), function (ret) {
    return ret.toString();
  });
}
function futureProfit(prizefunds, wager) {
  return (0, _lodash.mapValues)(__futureReturn(prizefunds, wager), function (ret) {
    return ret.minus(wager).toString();
  });
}
function futureProfitPercent(prizefunds, wager) {
  if (!__inNotZeroNumbers(prizefunds === null || prizefunds === void 0 ? void 0 : prizefunds[_constants.PRIZEFUNDS.TOTAL], wager)) return (0, _lodash.mapValues)(prizefunds, function () {
    return ZERO.toString();
  });
  wager = (0, _big["default"])(wager);
  return (0, _lodash.mapValues)(__futureReturn(prizefunds, wager), function (ret) {
    return ret.div(wager).minus(1).toString();
  });
}
function __actualReturn(prizefunds, wager, position) {
  var _prizefunds2, _prizefunds3;
  if (!__inNotZeroNumbers((_prizefunds2 = prizefunds) === null || _prizefunds2 === void 0 ? void 0 : _prizefunds2[_constants.PRIZEFUNDS.TOTAL], (_prizefunds3 = prizefunds) === null || _prizefunds3 === void 0 ? void 0 : _prizefunds3[position], wager)) return ZERO;
  wager = (0, _big["default"])(wager);
  prizefunds = (0, _lodash.mapValues)(prizefunds, function (prizefund) {
    return (0, _big["default"])(prizefund);
  });
  var result = prizefunds[_constants.PRIZEFUNDS.TOTAL].times(wager.div(prizefunds[position])).times(ONE.minus(VIGORISH));
  return result;
}
function actualReturn(prizefunds, wager, position) {
  var result = __actualReturn(prizefunds, wager, position);
  return result.toString();
}
function actualProfit(prizefunds, wager, position) {
  var result = __actualReturn(prizefunds, wager, position);
  return result.minus(wager).toString();
}
function actualProfitPercent(prizefunds, wager, position) {
  if (!__inNotZeroNumbers(prizefunds === null || prizefunds === void 0 ? void 0 : prizefunds[_constants.PRIZEFUNDS.TOTAL], wager, position)) return ZERO.toString();
  var result = __actualReturn(prizefunds, wager, position);
  wager = (0, _big["default"])(wager);
  return result.div(wager).minus(1).toString();
}
function futureDividends(round1, round2, wager) {
  var vigorish = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.01;
  if (!__inNumbers(round1, round2, wager, vigorish)) return 0;
  round1 = (0, _big["default"])(round1);
  round2 = (0, _big["default"])(round2);
  wager = (0, _big["default"])(wager);
  vigorish = (0, _big["default"])(vigorish);
  if (round1.plus(wager).eq(0)) return 0;
  if (round2.eq(0)) return wager;
  var totalfund = round1.plus(round2);
  var result = totalfund.plus(wager).times(wager.div(round1.plus(wager)));
  var commision = result.times(vigorish);
  return result.minus(commision).toString() || 0;
}
function dividends(round1, round2, wager) {
  var vigorish = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.01;
  if (!__inNumbers(round1, round2, wager, vigorish)) return 0;
  round1 = (0, _big["default"])(round1);
  round2 = (0, _big["default"])(round2);
  wager = (0, _big["default"])(wager);
  vigorish = (0, _big["default"])(vigorish);
  if (round1.eq(0)) return 0;
  if (round2.eq(0)) return wager;
  var totalfund = round1.plus(round2);
  var result = totalfund.times(wager.div(round1));
  var commision = result.times(vigorish);
  return result.minus(commision).toString() || 0;
}
function percent(wager, base) {
  var multiplicator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!__inNotZeroNumbers(wager, base, multiplicator)) return 0;
  wager = (0, _big["default"])(wager);
  base = (0, _big["default"])(base);
  return wager.div(base).times(multiplicator).toString() || 0;
}
function profitPercent(wager, base) {
  var multiplicator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (!__inNotZeroNumbers(wager, base, multiplicator)) return 0;
  wager = (0, _big["default"])(wager);
  base = (0, _big["default"])(base);
  return wager.div(base).times(multiplicator).minus(multiplicator).toString() || 0;
}
function add(number1, number2) {
  if (!__inNumbers(number1, number2)) return 0;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.plus(number2).toString() || 0;
}
function mul(number1, number2) {
  if (!__inNumbers(number1, number2)) return 0;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.times(number2).toString() || 0;
}
function sub(number1, number2) {
  if (!__inNumbers(number1, number2)) return 0;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.minus(number2).toString() || 0;
}
function div(number1, number2) {
  if (!__inNumbers(number1, number2)) return 0;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.div(number2).toString() || 0;
}
function gt(number1, number2) {
  if (!__inNumbers(number1, number2)) return undefined;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.gt(number2);
}
function gte(number1, number2) {
  if (!__inNumbers(number1, number2)) return undefined;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.gte(number2);
}
function eq(number1, number2) {
  if (!__inNumbers(number1, number2)) return undefined;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.eq(number2);
}
function lt(number1, number2) {
  if (!__inNumbers(number1, number2)) return undefined;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.lt(number2);
}
function lte(number1, number2) {
  if (!__inNumbers(number1, number2)) return undefined;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  return number1.lte(number2);
}
function min(number1, number2) {
  if (!__inNumbers(number1, number2)) return undefined;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  var m = number1.gt(number2) ? number2 : number1;
  return m.toString();
}
function max(number1, number2) {
  if (!__inNumbers(number1, number2)) return undefined;
  number1 = (0, _big["default"])(number1);
  number2 = (0, _big["default"])(number2);
  var m = number1.gt(number2) ? number1 : number2;
  return m.toString();
}
function toDecimalPricefeed(amount, pricefeed) {
  pricefeed = (0, _lodash.toLower)(pricefeed);
  if (!amount) return amount;
  if (!_constants.PRICEFEED.DECIMALS[pricefeed]) return amount;
  return toDecimal(amount, _constants.PRICEFEED.DECIMALS[pricefeed]);
}
function toDecimalGas(amount) {
  if (!amount) return amount;
  return toDecimal(amount, _constants.NATIVE.DECIMALS);
}
function toDecimalERC20(amount, erc20) {
  erc20 = (0, _lodash.toLower)(erc20);
  if (!amount) return amount;
  if (!_constants.ERC20[erc20]) return amount;
  return toDecimal(amount, _constants.ERC20.DECIMALS[_constants.ERC20[erc20]]);
}
function toDecimal(number, decimals) {
  if (!__inNumbers(number, decimals)) return undefined;
  return (0, _big["default"])(number).div(TEN.pow(decimals)).toString();
}
function fromDecimalPricefeed(amount, pricefeed) {
  pricefeed = (0, _lodash.toLower)(pricefeed);
  if (!amount) return amount;
  if (!_constants.PRICEFEED.DECIMALS[pricefeed]) return amount;
  return fromDecimal(amount, _constants.PRICEFEED.DECIMALS[pricefeed]);
}
function fromDecimalERC20(amount, erc20) {
  erc20 = (0, _lodash.toLower)(erc20);
  if (!amount) return amount;
  if (!_constants.ERC20[erc20]) return amount;
  return fromDecimal(amount, _constants.ERC20.DECIMALS[_constants.ERC20[erc20]]);
}
function fromDecimal(number, decimals) {
  if (!__inNumbers(number, decimals)) return undefined;
  return (0, _big["default"])(number).times(TEN.pow(decimals)).toString();
}
function isPositive(number) {
  if (!__inNumbers(number)) return undefined;
  return (0, _big["default"])(number).s === 1;
}
function isNegative(number) {
  if (!__inNumbers(number)) return undefined;
  return (0, _big["default"])(number).s === -1;
}
function round(number, dp, rm) {
  if (!__inNumbers(number)) return '0';
  number = (0, _big["default"])(number);
  return number.round(dp, rm).toString() || '0';
}
function toEnumeration(startNumber, endNumber) {
  if (!__inNumbers(startNumber, endNumber)) return [];
  var enumeration = [];
  for (var num = Number(startNumber); num <= Number(endNumber); ++num) {
    enumeration.push(String(num));
  }
  return enumeration;
}
function roundERC20(amount, erc20) {
  if (!amount) return amount;
  if (!_constants.ERC20[erc20]) return amount;
  return (0, _big["default"])(amount).round(_constants.ERC20.DECIMALS[_constants.ERC20[erc20]], 0).toString();
}
//# sourceMappingURL=index.js.map