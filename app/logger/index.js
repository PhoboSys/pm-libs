"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _debug = _interopRequireDefault(require("debug"));
var _Logger;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Logger = exports["default"] = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }
  return _createClass(Logger, null, [{
    key: "info",
    value: function info() {
      var _debuginfo$_;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_debuginfo$_ = _debuginfo._).call.apply(_debuginfo$_, [Logger].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _debugerror$_, _console;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      (_debugerror$_ = _debugerror._).call.apply(_debugerror$_, [Logger].concat(args));
      (_console = console).error.apply(_console, args); // eslint-disable-line
    }
  }, {
    key: "warn",
    value: function warn() {
      var _debugwarn$_;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      (_debugwarn$_ = _debugwarn._).call.apply(_debugwarn$_, [Logger].concat(args));
    }
  }, {
    key: "setNS",
    value: function setNS(ns) {
      _debuginfo._ = (0, _debug["default"])(ns + 'info');
      _debugwarn._ = (0, _debug["default"])(ns + 'warn');
      _debugerror._ = (0, _debug["default"])(ns + 'error');
    }
  }]);
}();
_Logger = Logger;
_defineProperty(Logger, "ns", 'pm:');
var _debuginfo = {
  _: (0, _debug["default"])(_Logger.ns + 'info')
};
var _debugwarn = {
  _: (0, _debug["default"])(_Logger.ns + 'warn')
};
var _debugerror = {
  _: (0, _debug["default"])(_Logger.ns + 'error')
};
//# sourceMappingURL=index.js.map