"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionScheduler = void 0;
var _lodash = require("lodash");
var _logger = _interopRequireDefault(require("../logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var ActionScheduler = exports.ActionScheduler = {
  init: function init(config) {
    if (!(0, _lodash.isPlainObject)(config)) {
      _logger["default"].warn('Empty config provided nothing will be scheduled');
      return;
    }
    for (var key in config) {
      var sch = new Scheduler(config[key]);
      sch.start();
      this[key] = sch;
    }
  }
};
var _collectors = /*#__PURE__*/new WeakMap();
var _tick = /*#__PURE__*/new WeakMap();
var _store = /*#__PURE__*/new WeakMap();
var _mergers = /*#__PURE__*/new WeakMap();
var _tickperiod = /*#__PURE__*/new WeakMap();
var _dispatchAction = /*#__PURE__*/new WeakMap();
var _tickerid = /*#__PURE__*/new WeakMap();
var _Scheduler_brand = /*#__PURE__*/new WeakSet();
var Scheduler = /*#__PURE__*/function () {
  function Scheduler(_ref) {
    var _this = this;
    var store = _ref.store,
      mergers = _ref.mergers,
      dispatch = _ref.dispatch,
      _ref$period = _ref.period,
      period = _ref$period === void 0 ? 1000 : _ref$period;
    _classCallCheck(this, Scheduler);
    _classPrivateMethodInitSpec(this, _Scheduler_brand);
    _classPrivateFieldInitSpec(this, _collectors, {});
    _classPrivateFieldInitSpec(this, _tick, 0);
    _classPrivateFieldInitSpec(this, _store, void 0);
    _classPrivateFieldInitSpec(this, _mergers, void 0);
    _classPrivateFieldInitSpec(this, _tickperiod, void 0);
    _classPrivateFieldInitSpec(this, _dispatchAction, void 0);
    _classPrivateFieldInitSpec(this, _tickerid, void 0);
    if ((0, _lodash.isEmpty)(store)) {
      throw new Error('Scheduler missing requiered parameter "store"');
    }
    _classPrivateFieldSet(_store, this, store);
    _classPrivateFieldSet(_mergers, this, mergers);
    _classPrivateFieldSet(_tickperiod, this, period);
    _classPrivateFieldSet(_dispatchAction, this, function (name, args) {
      return _classPrivateFieldGet(_store, _this).dispatch(name, args);
    });
    if ((0, _lodash.isFunction)(dispatch)) _classPrivateFieldSet(_dispatchAction, this, dispatch);
  }
  return _createClass(Scheduler, [{
    key: "addCollector",
    value: function addCollector(collector) {
      _classPrivateFieldGet(_collectors, this)[collector] = collector;
    }
  }, {
    key: "removeCollector",
    value: function removeCollector(collector) {
      delete _classPrivateFieldGet(_collectors, this)[collector];
    }
  }, {
    key: "collectors",
    value: function collectors() {
      return (0, _lodash.values)(_classPrivateFieldGet(_collectors, this));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      _classPrivateFieldSet(_tickerid, this, setInterval(function () {
        _classPrivateFieldGet(_tick, _this2) && _this2.dispatchScheduled();
        _classPrivateFieldSet(_tick, _this2, (_classPrivateFieldGet(_tick, _this2) + 1) % Number.MAX_SAFE_INTEGER);
      }, _classPrivateFieldGet(_tickperiod, this)));
      _logger["default"].info('Start ActionScheduler TickerID:%s', _classPrivateFieldGet(_tickerid, this));
    }
  }, {
    key: "stop",
    value: function stop() {
      if (_classPrivateFieldGet(_tickerid, this)) {
        clearInterval(_classPrivateFieldGet(_tickerid, this));
        _logger["default"].info('Stop ActionScheduler TickerID:%s', _classPrivateFieldGet(_tickerid, this));
      }
    }
  }, {
    key: "dispatchNow",
    value: function dispatchNow(collectors) {
      var tick = 0;
      _assertClassBrand(_Scheduler_brand, this, _dispatch).call(this, tick, (0, _lodash.castArray)(collectors || this.collectors()));
    }
  }, {
    key: "dispatchScheduled",
    value: function dispatchScheduled(collectors) {
      _assertClassBrand(_Scheduler_brand, this, _dispatch).call(this, _classPrivateFieldGet(_tick, this), (0, _lodash.castArray)(collectors || this.collectors()));
    }
  }]);
}();
function _collectActions(tick, collectors) {
  var _this3 = this;
  return (0, _lodash.reduce)(collectors, function (actions, collect) {
    if (!(0, _lodash.isFunction)(collect)) return actions;
    collect(function (name, args, metadata) {
      var schedule = (0, _lodash.get)(metadata, 'schedule');
      if (!schedule) {
        _logger["default"].info('No schedule provided, action %s dispached on each tick', name);
      }
      if (!schedule || tick % schedule === 0) {
        if ((0, _lodash.isEmpty)(actions[name])) actions[name] = [];
        actions[name].push(args);
      }
    }, _classPrivateFieldGet(_store, _this3).getState());
    return actions;
  }, {});
}
function _reduceActions(actions) {
  actions = _objectSpread({}, actions);
  var names = (0, _lodash.keys)(actions);
  var _iterator = _createForOfIteratorHelper(names),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var name = _step.value;
      var merger = (0, _lodash.get)(_classPrivateFieldGet(_mergers, this), [name]);
      if (!merger) continue;
      var mergedActions = merger(actions[name]);
      if ((0, _lodash.isEqual)(mergedActions[name], actions[name]) && (0, _lodash.isEqual)((0, _lodash.keys)(mergedActions), [name])) continue;
      delete actions[name];
      for (var mergedActionsName in mergedActions) {
        var _actions$mergedAction;
        var mergedAction = mergedActions[mergedActionsName];
        if ((0, _lodash.isEmpty)(actions[mergedActionsName])) actions[mergedActionsName] = [];
        (_actions$mergedAction = actions[mergedActionsName]).push.apply(_actions$mergedAction, _toConsumableArray(mergedAction));

        // push to merge again if new merge candidate was added
        if (actions[mergedActionsName].length > 1) {
          names.push(mergedActionsName);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return actions;
}
function _dispatch(tick, collectors) {
  if (!(0, _lodash.isArray)(collectors) || (0, _lodash.isEmpty)(collectors)) return;
  var rawActions = _assertClassBrand(_Scheduler_brand, this, _collectActions).call(this, tick, collectors);
  var actions = _assertClassBrand(_Scheduler_brand, this, _reduceActions).call(this, rawActions);
  for (var name in actions) {
    var _iterator2 = _createForOfIteratorHelper(actions[name]),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var args = _step2.value;
        _classPrivateFieldGet(_dispatchAction, this).call(this, name, args);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}
//# sourceMappingURL=index.js.map