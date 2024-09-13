"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_WEB3_PROVIDER = void 0;
var _ethers = require("ethers");
var _logger = _interopRequireDefault(require("../logger"));
var _constants = require("./constants");
var _RpcUrls;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _superPropGet(t, e, o, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), e, o); return 2 & r && "function" == typeof p ? function (t) { return p.apply(o, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropSet(t, e, o, r, p, f) { return _set(_getPrototypeOf(f ? t.prototype : t), e, o, r, p); }
function set(e, r, t, o) { return set = "undefined" != typeof Reflect && Reflect.set ? Reflect.set : function (e, r, t, o) { var f, i = _superPropBase(e, r); if (i) { if ((f = Object.getOwnPropertyDescriptor(i, r)).set) return f.set.call(o, t), !0; if (!f.writable) return !1; } if (f = Object.getOwnPropertyDescriptor(o, r)) { if (!f.writable) return !1; f.value = t, Object.defineProperty(o, r, f); } else _defineProperty(o, r, t); return !0; }, set(e, r, t, o); }
function _set(e, r, t, o, f) { if (!set(e, r, t, o || e) && f) throw new TypeError("failed to set property"); return t; }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _RpcUrls_brand = /*#__PURE__*/new WeakSet();
var RpcUrls = /*#__PURE__*/function () {
  function RpcUrls(_urls) {
    _classCallCheck(this, RpcUrls);
    _classPrivateMethodInitSpec(this, _RpcUrls_brand);
    this.urls = _assertClassBrand(_RpcUrls_brand, this, _withPersisted).call(this, _urls.map(function (url) {
      return {
        url: url
      };
    }));
  }
  return _createClass(RpcUrls, [{
    key: "urls_unlocked",
    get: function get() {
      var _this = this;
      return this.urls.filter(function (_, index) {
        return !_assertClassBrand(_RpcUrls_brand, _this, _isLocked).call(_this, index);
      });
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      if (this.urlIndex === undefined) this.urlIndex = 0;else this.urlIndex = (this.urlIndex + 1) % this.urls.length;
      var passed = 0;
      while (_assertClassBrand(_RpcUrls_brand, this, _isLocked).call(this, this.urlIndex) && passed !== this.urls.length) {
        passed++;
        this.urlIndex = (this.urlIndex + 1) % this.urls.length;
      }
      return this.urls[this.urlIndex].url;
    }
  }, {
    key: "updateSuccessStatistic",
    value: function updateSuccessStatistic(url) {
      var index = this.urls.findIndex(function (url_data) {
        return url_data.url === url;
      });
      if (index !== -1) {
        this.urls[index].successTotal = (this.urls[index].successTotal || 0) + 1;
        this.urls[index].lastSuccessAt = new Date().getTime();
        _assertClassBrand(_RpcUrls_brand, this, _updateSuccessRate).call(this, url);
        _assertClassBrand(_RpcUrls_brand, this, _updateLocalStorageStatistic).call(this);
      }
    }
  }, {
    key: "updateFailStatistic",
    value: function updateFailStatistic(url, error) {
      var index = this.urls.findIndex(function (url_data) {
        return url_data.url === url;
      });
      if (index !== -1) {
        this.urls[index].errors = [].concat(_toConsumableArray(this.urls[index].errors || []), [error]);
        this.urls[index].lastFailAt = new Date().getTime();
        this.urls[index].failedTotal = (this.urls[index].failedTotal || 0) + 1;
        if (this.urls[index].errors.length > RpcUrls.maxErrorsLimit) this.urls[index].errors.shift();
        _assertClassBrand(_RpcUrls_brand, this, _updateSuccessRate).call(this, url);
        _assertClassBrand(_RpcUrls_brand, this, _updateLocalStorageStatistic).call(this);
      }
    }
  }]);
}();
_RpcUrls = RpcUrls;
function _isLocked(index) {
  var successTotal = this.urls[index].successTotal || 0;
  var failedTotal = this.urls[index].failedTotal || 0;
  var successRate = this.urls[index].successRate;
  var lastFailAt = this.urls[index].lastFailAt;
  var isSuccessRateLow = successRate < _RpcUrls.minSuccessRate;
  var isEnoughRequestsForLock = successTotal + failedTotal >= _RpcUrls.minRequestsForLock;
  var hasFail = !!lastFailAt;
  var notLongAgoFailed = new Date().getTime() - lastFailAt < _RpcUrls.lockDurationMs;
  return isEnoughRequestsForLock && isSuccessRateLow && hasFail && notLongAgoFailed;
}
function _updateSuccessRate(url) {
  var index = this.urls.findIndex(function (url_data) {
    return url_data.url === url;
  });
  if (index !== -1) {
    var successTotal = this.urls[index].successTotal || 0;
    var failedTotal = this.urls[index].failedTotal || 0;
    var total = successTotal + failedTotal;
    var successRate;
    if (total === 0) successRate = 0;else if (successTotal === 0) successRate = 0;else if (failedTotal === 0) successRate = 1;else successRate = Math.floor(successTotal / total * 100) / 100;
    this.urls[index].successRate = successRate;
  }
}
function _withPersisted(urls) {
  var _this3 = this;
  var persisted = _assertClassBrand(_RpcUrls_brand, this, _getLocalStorageStatistic).call(this);
  if (persisted && persisted.urls && persisted.version === _RpcUrls.localStorageVersion) {
    return urls.map(function (url_data) {
      var persisted_url_data = persisted.urls[url_data.url] || {};
      var data = _objectSpread(_objectSpread({}, url_data), persisted_url_data);
      if (data.successRate) data.successRate = _assertClassBrand(_RpcUrls_brand, _this3, _fromPercent2Decimal).call(_this3, data.successRate);
      if (data.lastSuccessAt) data.lastSuccessAt = _assertClassBrand(_RpcUrls_brand, _this3, _fromDate2Timestamp).call(_this3, data.lastSuccessAt);
      if (data.lastFailAt) data.lastFailAt = _assertClassBrand(_RpcUrls_brand, _this3, _fromDate2Timestamp).call(_this3, data.lastFailAt);
      return data;
    });
  } else {
    _assertClassBrand(_RpcUrls_brand, this, _removeLocalStorageStatistic).call(this);
    return urls;
  }
}
function _updateLocalStorageStatistic() {
  var _this4 = this;
  var urls = this.urls.reduce(function (acc, url_data) {
    var data = _objectSpread({}, url_data);
    delete data.url;
    if (data.successRate) data.successRate = _assertClassBrand(_RpcUrls_brand, _this4, _fromDecimal2Percent).call(_this4, data.successRate);
    if (data.lastSuccessAt) data.lastSuccessAt = _assertClassBrand(_RpcUrls_brand, _this4, _fromTimestamp2Date).call(_this4, data.lastSuccessAt);
    if (data.lastFailAt) data.lastFailAt = _assertClassBrand(_RpcUrls_brand, _this4, _fromTimestamp2Date).call(_this4, data.lastFailAt);
    if (Object.keys(data).length) acc[url_data.url] = data;
    return acc;
  }, {});
  window.localStorage.setItem(_RpcUrls.localStoragePath, JSON.stringify({
    version: _RpcUrls.localStorageVersion,
    urls: urls
  }));
}
function _getLocalStorageStatistic() {
  return JSON.parse(window.localStorage.getItem(_RpcUrls.localStoragePath) || '{}');
}
function _removeLocalStorageStatistic() {
  localStorage.removeItem(_RpcUrls.localStoragePath);
}
function _fromDecimal2Percent(decimal) {
  return decimal * 100 + '%';
}
function _fromPercent2Decimal(percent) {
  return +String(percent).split('%')[0] / 100;
}
function _fromDate2Timestamp(date) {
  return Date.parse(date);
}
function _fromTimestamp2Date(timestamp) {
  return new Date(timestamp).toString();
}
_defineProperty(RpcUrls, "localStoragePath", '__rpc-requests-statistics');
_defineProperty(RpcUrls, "localStorageVersion", 'v4');
_defineProperty(RpcUrls, "lockDurationMs", 1 * 60 * 60 * 1000);
// 1 hour
_defineProperty(RpcUrls, "maxErrorsLimit", 20);
_defineProperty(RpcUrls, "minRequestsForLock", 10);
_defineProperty(RpcUrls, "minSuccessRate", 0.70);
var _PM_FetchRequest_brand = /*#__PURE__*/new WeakSet();
var PM_FetchRequest = /*#__PURE__*/function (_FetchRequest) {
  function PM_FetchRequest(rpc_urls) {
    var _this2;
    _classCallCheck(this, PM_FetchRequest);
    _this2 = _callSuper(this, PM_FetchRequest);
    /**
     *  Stringify error.
     */
    _classPrivateMethodInitSpec(_this2, _PM_FetchRequest_brand);
    _superPropSet((_this2, PM_FetchRequest), "getUrlFunc", _this2.getUrlFunc.bind(_this2), _this2, 1, 1);
    _superPropGet((_this2, PM_FetchRequest), "setThrottleParams", _this2, 3)([{
      maxAttempts: 1,
      slotInterval: 250
    }]);
    _this2.rpc_urls = rpc_urls;
    _this2.makeRequest = _ethers.FetchRequest.createGetUrlFunc({}); // Could be any other custom fetcher
    return _this2;
  }

  /**
   *  Function which makes/retries requests to rpc distributed endpoints.
   */
  _inherits(PM_FetchRequest, _FetchRequest);
  return _createClass(PM_FetchRequest, [{
    key: "getUrlFunc",
    value: (function () {
      var _getUrlFunc = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, signal) {
        var requested,
          plural,
          res,
          _window$navigator,
          canRetry,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              requested = _args.length > 2 && _args[2] !== undefined ? _args[2] : [];
              req.url = this.rpc_urls.getUrl();
              if (requested.length) {
                while (req.url && requested.includes(req.url) && requested.length < this.rpc_urls.urls_unlocked.length) {
                  req.url = this.rpc_urls.getUrl();
                }
                plural = requested.length > 1;
                _logger["default"].warn('Attempt to request %s. Previous attempt%s %s to: %s.', req.url, plural ? 's' : '', plural ? 'were' : 'was', requested.join(', '));
              }
              _context.prev = 3;
              _context.next = 6;
              return this.makeRequest(req, signal);
            case 6:
              res = _context.sent;
              this.validateResponse(res);
              this.rpc_urls.updateSuccessStatistic(req.url);
              return _context.abrupt("return", res);
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              _logger["default"].warn('Request to %s failed. %s', req.url, _context.t0);
              requested.push(req.url);
              canRetry = requested.length < this.rpc_urls.urls_unlocked.length && ((_window$navigator = window.navigator) === null || _window$navigator === void 0 ? void 0 : _window$navigator.onLine);
              this.rpc_urls.updateFailStatistic(req.url, _context.t0.toString());
              if (!canRetry) {
                _context.next = 22;
                break;
              }
              return _context.abrupt("return", this.getUrlFunc(req, signal, requested));
            case 22:
              _logger["default"].warn('Request was aborted cause all attempts were used. Attempted:', requested.join(', '));
            case 23:
              throw _context.t0;
            case 24:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 12]]);
      }));
      function getUrlFunc(_x, _x2) {
        return _getUrlFunc.apply(this, arguments);
      }
      return getUrlFunc;
    }()
    /**
     *  Throws an error if response is not ok.
     */
    )
  }, {
    key: "validateResponse",
    value: function validateResponse(response) {
      var statusCodeSuccess = response.statusCode >= 200 && response.statusCode < 300;
      var body = JSON.parse(new TextDecoder().decode(response.body));
      if (statusCodeSuccess && !body.error) return;
      var message = '';
      if (body.error) message = "".concat(message, " ").concat(_assertClassBrand(_PM_FetchRequest_brand, this, _errorToString).call(this, body.error)).trim();
      if (response.statusCode) message = "".concat(message, " statusCode=").concat(response.statusCode).trim();
      if (response.statusMessage) message = "".concat(message, " statusMessage=").concat(response.statusMessage).trim();
      throw new Error(message.trim());
    }
  }]);
}(_ethers.FetchRequest);
function _errorToString(error) {
  var _this5 = this;
  var errorString = '';
  if (error) {
    if (typeof error === 'string') {
      errorString = error;
    } else if (typeof error === 'number') {
      errorString = "".concat(error);
    } else if (Array.isArray(error)) {
      errorString = error.map(function (e) {
        return _assertClassBrand(_PM_FetchRequest_brand, _this5, _errorToString).call(_this5, e);
      }).join(', ');
    } else if (_typeof(error) === 'object' && error !== null) {
      errorString = Object.keys(error).map(function (key) {
        return "".concat(key, "=").concat(_assertClassBrand(_PM_FetchRequest_brand, _this5, _errorToString).call(_this5, error[key]));
      }).join(' ');
    }
  }
  return errorString.trim();
}
var DEFAULT_WEB3_PROVIDER = exports.DEFAULT_WEB3_PROVIDER = new _ethers.JsonRpcProvider(new PM_FetchRequest(new RpcUrls(_constants.NETWORK_URLS.READ[_constants.NETWORK])), _ethers.Network.from(_constants.NETWORK), {
  staticNetwork: _ethers.Network.from(_constants.NETWORK),
  batchMaxCount: 1
});
//# sourceMappingURL=default-web3-provider.js.map