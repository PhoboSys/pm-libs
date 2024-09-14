"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("./constants");
var _utils = require("./utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var chains = _defineProperty(_defineProperty(_defineProperty({}, (0, _utils.toHex)(_constants.POLYGON), {
  'chainId': (0, _utils.toHex)(_constants.POLYGON),
  'chainName': 'Polygon',
  'nativeCurrency': {
    'name': 'Polygon Ecosystem Token',
    'symbol': 'POL',
    'decimals': 18
  },
  'rpcUrls': _constants.NETWORK_URLS.WRITE[_constants.POLYGON],
  'blockExplorerUrls': [_constants.SCANNER_URLS[_constants.POLYGON]]
}), (0, _utils.toHex)(_constants.POLYGON_MUMBAI), {
  'chainId': (0, _utils.toHex)(_constants.POLYGON_MUMBAI),
  'chainName': 'Polygon Mumbai',
  'name': 'Polygon Mumbai',
  'nativeCurrency': {
    'name': 'Polygon Ecosystem Token',
    'symbol': 'POL',
    'decimals': 18
  },
  'rpcUrls': _constants.NETWORK_URLS.WRITE[_constants.POLYGON_MUMBAI],
  'blockExplorerUrls': [_constants.SCANNER_URLS[_constants.POLYGON_MUMBAI]]
}), (0, _utils.toHex)(_constants.LDE), {
  'chainId': (0, _utils.toHex)(_constants.LDE),
  'chainName': 'Polygon LDE',
  'nativeCurrency': {
    'name': 'Polygon Ecosystem Token',
    'symbol': 'POL',
    'decimals': 18
  },
  'rpcUrls': _constants.NETWORK_URLS.WRITE[_constants.LDE],
  'blockExplorerUrls': ['https://polygonscan.com']
});
var _default = exports["default"] = chains;
//# sourceMappingURL=chains.js.map