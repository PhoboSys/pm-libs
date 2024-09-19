"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lodash = require("lodash");
var _storage = require("./storage");
var _storageCookie = _interopRequireDefault(require("./storage-cookie"));
var _storageLocal = _interopRequireDefault(require("./storage-local"));
var _logger = _interopRequireDefault(require("../logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Factory = exports["default"] = /*#__PURE__*/function () {
  function Factory() {
    _classCallCheck(this, Factory);
  }
  return _createClass(Factory, null, [{
    key: "create",
    value: function create(storageCfg) {
      _logger["default"].info('Creating storage', storageCfg);
      var resource = (0, _lodash.get)(storageCfg, 'resource');
      if (resource === _storage.STORAGE_LOCAL) return new _storageLocal["default"](storageCfg);
      if (resource === _storage.STORAGE_COOKIE) return new _storageCookie["default"](storageCfg);
      return new _storageLocal["default"](storageCfg);
    }
  }]);
}();
//# sourceMappingURL=factory.js.map