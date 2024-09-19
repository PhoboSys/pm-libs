"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _logger = _interopRequireDefault(require("../logger"));
var _factory = _interopRequireDefault(require("./factory"));
var _excluded = ["storages"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Persistence = exports["default"] = /*#__PURE__*/function () {
  function Persistence() {
    _classCallCheck(this, Persistence);
  }
  return _createClass(Persistence, null, [{
    key: "init",
    value: function init(config) {
      _logger["default"].info('Starting initialization');
      if (config.storages) {
        var totalState = {};
        for (var storageName in config.storages) {
          // eslint-disable-next-line
          var storages = config.storages,
            globalConfig = _objectWithoutProperties(config, _excluded);
          var storageCfg = _objectSpread(_objectSpread({}, config.storages[storageName]), {}, {
            storageName: storageName
          });
          var cfg = _objectSpread(_objectSpread({}, globalConfig), storageCfg);
          if (!Persistence[storageName]) Persistence[storageName] = _factory["default"].create(cfg);
          Persistence[storageName].storageCleanUp();
          var state = Persistence[storageName].get();
          totalState = _objectSpread(_objectSpread({}, totalState), state);
        }
        return totalState;
      } else {
        var _cfg = _objectSpread(_objectSpread({}, config), {}, {
          storageName: 'instance'
        });
        if (!Persistence.instance) Persistence.instance = _factory["default"].create(_cfg);
        Persistence.instance.storageCleanUp();
        return Persistence.instance.get();
      }
    }
  }]);
}();
//# sourceMappingURL=index.js.map