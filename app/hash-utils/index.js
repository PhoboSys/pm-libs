"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorHash = colorHash;
exports.hexHash = hexHash;
exports.keccak256 = keccak256;
exports.numericHash = numericHash;
exports.replace = replace;
exports.subgraphKeccak256 = subgraphKeccak256;
exports.toHex = toHex;
var _ethers = require("ethers");
var _bettorIcons = require("../../constants/bettorIcons");
var _logger = _interopRequireDefault(require("../logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function keccak256(values, types) {
  try {
    return (0, _ethers.keccak256)(_ethers.AbiCoder.defaultAbiCoder().encode(types, values));
  } catch (ex) {
    _logger["default"].error(ex);
    return null;
  }
}
function replace(str, repls) {
  if (!Array.isArray(repls)) repls = [];
  var _iterator = _createForOfIteratorHelper(repls),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var repl = _step.value;
      str = str.replace('%s', repl);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return str;
}
function toHex(str) {
  return "0x".concat(Buffer.from(str, 'utf8').toString('hex'));
}
function subgraphKeccak256(value) {
  try {
    return (0, _ethers.keccak256)((0, _ethers.toUtf8Bytes)(JSON.stringify(value)));
  } catch (ex) {
    _logger["default"].error(ex);
    return null;
  }
}
function reapeat(pattern, times) {
  var result = [];
  var idx = 0;
  while (idx++ < times) {
    result.push(pattern);
  }
  return result.join('');
}
function hexHash(any) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  try {
    var str = JSON.stringify(any);
    var numhash = numericHash(str);
    var len = Number(reapeat('9', length));
    var shorthash = numhash % len;
    var hexhash = shorthash.toString(16);
    return hexhash;
  } catch (e) {
    _logger["default"].warn('Cannot hash', any);
    _logger["default"].warn('Because', e);
  }
}
function numericHash(s) {
  var h = 0;
  if (!s || !s.length) return h;
  for (var i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
function colorHash(name) {
  var hash = numericHash(name);
  var colorId = hash % _bettorIcons.BETTOR_ICON_COLORS.length;
  return _bettorIcons.BETTOR_ICON_COLORS[colorId];
}
//# sourceMappingURL=index.js.map