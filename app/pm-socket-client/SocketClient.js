"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketClient = void 0;
var _logger = _interopRequireDefault(require("../logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _onError = /*#__PURE__*/new WeakMap();
var _onClose = /*#__PURE__*/new WeakMap();
var _onOpen = /*#__PURE__*/new WeakMap();
var _onMessage = /*#__PURE__*/new WeakMap();
var _SocketClient_brand = /*#__PURE__*/new WeakSet();
var SocketClient = exports.SocketClient = /*#__PURE__*/_createClass(function SocketClient(config) {
  var _this = this;
  _classCallCheck(this, SocketClient);
  _classPrivateMethodInitSpec(this, _SocketClient_brand);
  _defineProperty(this, "connect", function () {
    _logger["default"].info('ws connecting to: %s', _this.baseUrl);
    _this._wsClient = new WebSocket(_this.baseUrl);
    _this._wsClient.onerror = _classPrivateFieldGet(_onError, _this);
    _this._wsClient.onopen = _classPrivateFieldGet(_onOpen, _this);
    _this._wsClient.onmessage = _classPrivateFieldGet(_onMessage, _this);
    _this._wsClient.onclose = _classPrivateFieldGet(_onClose, _this);
  });
  _classPrivateFieldInitSpec(this, _onError, function (e) {
    _logger["default"].error(e);
  });
  _classPrivateFieldInitSpec(this, _onClose, function () {
    _logger["default"].info('ws closing connection! url: %s', _this.baseUrl);
    if (_this.onConnectionClosed) _this.onConnectionClosed();
  });
  _classPrivateFieldInitSpec(this, _onOpen, function () {
    _logger["default"].info('ws successfully opened! url: %s', _this.baseUrl);
    if (_this.onConnectionOpened) _this.onConnectionOpened();
  });
  _classPrivateFieldInitSpec(this, _onMessage, function (_ref) {
    var data = _ref.data;
    _logger["default"].info('ws message received: %s', data);
    var msg = _assertClassBrand(_SocketClient_brand, _this, _parse).call(_this, data);
    if (msg && _this.onMessageReceived) _this.onMessageReceived(msg);
  });
  _defineProperty(this, "send", function (data) {
    return new Promise(function (resolve, reject) {
      var msg = JSON.stringify(data);
      _logger["default"].info('ws message sent: %s', msg);
      if (!_this._wsClient) {
        _logger["default"].error('ws failed to send message, no websocket client');
        reject();
      }
      if (_this._wsClient.readyState !== WebSocket.OPEN) {
        _logger["default"].error('ws failed to send message, connection is not opened');
        reject();
      }
      _this._wsClient.send(msg);
      resolve();
    });
  });
  this.baseUrl = config.baseUrl;
  this.onMessageReceived = config.onMessageReceived;
  this.onConnectionOpened = config.onConnectionOpened;
  this.onConnectionClosed = config.onConnectionClosed;
});
function _parse(rawdata) {
  try {
    return JSON.parse(rawdata);
  } catch (ex) {
    _logger["default"].error(ex);
  }
  return {};
}
//# sourceMappingURL=SocketClient.js.map