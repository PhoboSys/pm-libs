"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web3client = exports.useWallet = exports.useBalance = exports.useAllowance = void 0;
var _lodash = require("lodash");
var _react = require("react");
var _ethers = require("ethers");
var _pmWallet = require("pm-wallet");
var _defaultWeb3Provider = require("./default-web3-provider");
var _IERC = _interopRequireDefault(require("./abis/@openzeppelin/IERC20.json"));
var _constants = require("./constants");
var _utils = require("./utils");
var _chains = _interopRequireDefault(require("./chains"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var logError = function logError(error) {
  return console.error(error);
}; // eslint-disable-line

var WEB3_PROVIDER = _defaultWeb3Provider.DEFAULT_WEB3_PROVIDER;
var isAuthorized = false;
var SIGNER = null;
var authSigner = null;
var auth = new Promise(function (res, rej) {
  authSigner = res;
})["catch"](logError);
var web3client = exports.web3client = {
  __cache: {},
  waitForTransaction: function waitForTransaction(hash) {
    return WEB3_PROVIDER.waitForTransaction(hash);
  },
  request: function () {
    var _request = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(args) {
      var signer;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return auth;
          case 2:
            signer = _context.sent;
            if (!(isAuthorized && signer)) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", WEB3_PROVIDER.send(args.method, args.params));
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function request(_x) {
      return _request.apply(this, arguments);
    }
    return request;
  }(),
  getBalance: function getBalance(address, args) {
    if (address) {
      return _defaultWeb3Provider.DEFAULT_WEB3_PROVIDER.getBalance(address, args);
    }
  },
  call: function call() {
    var _WEB3_PROVIDER;
    return (_WEB3_PROVIDER = WEB3_PROVIDER).call.apply(_WEB3_PROVIDER, arguments);
  },
  sendTransaction: function () {
    var _sendTransaction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var signer,
        _args2 = arguments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return auth;
          case 2:
            signer = _context2.sent;
            if (!(isAuthorized && signer)) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return", signer.sendTransaction.apply(signer, _args2));
          case 5:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function sendTransaction() {
      return _sendTransaction.apply(this, arguments);
    }
    return sendTransaction;
  }(),
  get: function get(address, abi, options) {
    if (address && abi) {
      var singer = SIGNER;
      if (options !== null && options !== void 0 && options.readonly) singer = null;
      var cachekey = address + String(singer ? singer.address : '');
      if (!web3client.__cache[cachekey]) {
        web3client.__cache[cachekey] = web3client.create(address, abi, singer);
      }
      return web3client.__cache[cachekey];
    } else {
      if (!abi) logError('abi in missing!');
    }
  },
  create: function create(address, abi, signer) {
    if (address && abi) {
      if (isAuthorized && signer) return new _ethers.Contract(address, abi, signer);else return new _ethers.Contract(address, abi, _defaultWeb3Provider.DEFAULT_WEB3_PROVIDER);
    } else {
      if (!abi) logError('abi in missing!');
    }
  }
};
var useERC20Client = function useERC20Client(call, erc20, interval, chainId, account) {
  var web3React = (0, _pmWallet.useWeb3React)();
  chainId = chainId || web3React.chainId;
  account = account || web3React.account;
  var _useState = (0, _react.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    result = _useState2[0],
    setResult = _useState2[1];
  var __effectify = function __effectify(onResult, onError, fn) {
    return /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var cancel, _result;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            cancel = false;
            _context3.prev = 1;
            _context3.next = 4;
            return fn();
          case 4:
            _result = _context3.sent;
            !cancel && onResult && onResult(_result);
            _context3.next = 11;
            break;
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            onError && onError(_context3.t0);
          case 11:
            return _context3.abrupt("return", function () {
              return cancel = true;
            });
          case 12:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 8]]);
    }));
  };
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    tick = _useState4[0],
    setTick = _useState4[1];
  (0, _react.useEffect)(function () {
    if (!interval) return;
    var variation = 1;
    var TIMERID = setInterval(function () {
      setTick(variation);
      variation = ~variation;
    }, interval);
    return function () {
      clearInterval(TIMERID);
    };
  }, [interval]);
  (0, _react.useEffect)(function () {
    setResult(void 0);
  }, [erc20]);
  (0, _react.useEffect)(__effectify(setResult, logError, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var erc20client;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(account && (0, _utils.toHex)(chainId) in _chains["default"])) {
            _context4.next = 6;
            break;
          }
          erc20client = web3client.get(erc20, _IERC["default"].abi);
          if (!(call && erc20client)) {
            _context4.next = 6;
            break;
          }
          _context4.next = 5;
          return call({
            erc20client: erc20client,
            account: account,
            chainId: chainId
          });
        case 5:
          return _context4.abrupt("return", _context4.sent);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }))), [account, chainId, tick, erc20]);
  return result;
};
var useAllowance = exports.useAllowance = function useAllowance(erc20, contract, interval) {
  return useERC20Client(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref3) {
      var erc20client, account;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            erc20client = _ref3.erc20client, account = _ref3.account;
            _context5.next = 3;
            return erc20client.allowance(account, contract);
          case 3:
            return _context5.abrupt("return", _context5.sent.toString());
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }(), erc20, interval);
};
var useBalance = exports.useBalance = function useBalance(erc20, interval) {
  return useERC20Client(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref5) {
      var erc20client, account;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            erc20client = _ref5.erc20client, account = _ref5.account;
            _context6.next = 3;
            return erc20client.balanceOf(account);
          case 3:
            return _context6.abrupt("return", _context6.sent.toString());
          case 4:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function (_x3) {
      return _ref6.apply(this, arguments);
    };
  }(), erc20, interval);
};
var useWallet = exports.useWallet = function useWallet() {
  var _web3React$provider;
  var autoSelectChain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var web3React = (0, _pmWallet.useWeb3React)();
  var ethprovider = (_web3React$provider = web3React.provider) === null || _web3React$provider === void 0 ? void 0 : _web3React$provider.provider;
  var _useState5 = (0, _react.useState)(),
    _useState6 = _slicedToArray(_useState5, 2),
    ready = _useState6[0],
    setReady = _useState6[1];
  var action = (0, _react.useRef)();
  var __actionize = (0, _react.useCallback)(function (name, fn) {
    return _defineProperty({}, name, _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var _args7 = arguments;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (!(action.current && !action.current.error)) {
              _context7.next = 3;
              break;
            }
            throw new Error("Action \"".concat(action.current.name, "\" is still in progress!"));
          case 3:
            action.current = {
              name: name
            };
            _context7.next = 6;
            return fn.apply(void 0, _args7);
          case 6:
            action.current = null;
            _context7.next = 12;
            break;
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](0);
            // swallow errors
            action.current = {
              name: name,
              error: _context7.t0
            };
            // switch chain is pending swallow error, other reset()
            // if (error.code !== -32002) web3React.reset()
          case 12:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 9]]);
    })));
  }, [action, web3React]);
  var actions = (0, _react.useRef)();
  actions.current = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, __actionize('disconnect', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return Promise.all(_pmWallet.Connectors.map(function (_ref10) {
              var _ref11 = _slicedToArray(_ref10, 2),
                conn = _ref11[0],
                hooks = _ref11[1];
              if (conn.deactivate) return conn.deactivate();else return conn.resetState();
            }));
          case 2:
            window.localStorage.removeItem('__connector');
            web3client.__cache = {};
            isAuthorized = false;
          case 5:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })))), __actionize('connect', /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(connectorId) {
        var c, _c, connector;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              c = _pmWallet.Connectors.find(function (_ref13) {
                var _ref14 = _slicedToArray(_ref13, 2),
                  conn = _ref14[0],
                  hooks = _ref14[1];
                return connectorId === (0, _pmWallet.getConnName)(conn);
              });
              if (!c) {
                _context9.next = 45;
                break;
              }
              _c = _slicedToArray(c, 1), connector = _c[0];
              if (!(!window.ethereum && connectorId === 'injected')) {
                _context9.next = 7;
                break;
              }
              window.open('https://wallet.uniswap.org/', '_blank');
              _context9.next = 43;
              break;
            case 7:
              if (connector !== null && connector !== void 0 && connector.deactivate) void connector.deactivate();else void connector.resetState();
              if (!(connector instanceof _pmWallet.WalletConnect || connector instanceof _pmWallet.Network)) {
                _context9.next = 13;
                break;
              }
              _context9.next = 11;
              return connector.activate(_constants.NETWORK);
            case 11:
              _context9.next = 40;
              break;
            case 13:
              if (!(
              // NOTE: Workaround known issue with MetaMask wallet extention
              // https://github.com/MetaMask/metamask-extension/issues/10085
              connector instanceof _pmWallet.MetaMask)) {
                _context9.next = 38;
                break;
              }
              _context9.prev = 14;
              _context9.next = 17;
              return connector.activate((0, _pmWallet.getAddChainParameters)(_constants.NETWORK));
            case 17:
              _context9.next = 36;
              break;
            case 19:
              _context9.prev = 19;
              _context9.t0 = _context9["catch"](14);
              if (!(_context9.t0.code !== -32002)) {
                _context9.next = 23;
                break;
              }
              throw _context9.t0;
            case 23:
              _context9.prev = 23;
              _context9.next = 26;
              return WEB3_PROVIDER.send('wallet_requestPermissions', [{
                eth_accounts: {}
              }]);
            case 26:
              _context9.next = 28;
              return connector.activate((0, _pmWallet.getAddChainParameters)(_constants.NETWORK));
            case 28:
              _context9.next = 36;
              break;
            case 30:
              _context9.prev = 30;
              _context9.t1 = _context9["catch"](23);
              if (!(_context9.t1.code !== -32002)) {
                _context9.next = 34;
                break;
              }
              throw _context9.t1;
            case 34:
              _context9.next = 36;
              return new Promise(function () {});
            case 36:
              _context9.next = 40;
              break;
            case 38:
              _context9.next = 40;
              return connector.activate((0, _pmWallet.getAddChainParameters)(_constants.NETWORK));
            case 40:
              window.localStorage.setItem('__connector', connectorId);
              web3client.__cache = {};
              isAuthorized = true;
            case 43:
              _context9.next = 48;
              break;
            case 45:
              web3client.__cache = {};
              isAuthorized = false;
              throw new Error("Unsupported connector \"".concat(connectorId, "\""));
            case 48:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[14, 19], [23, 30]]);
      }));
      return function (_x4) {
        return _ref12.apply(this, arguments);
      };
    }())), __actionize('connectEagerly', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var cname, c, _c2, connector;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            cname = window.localStorage.getItem('__connector');
            if (!(!web3React.isActive && cname)) {
              _context10.next = 9;
              break;
            }
            c = _pmWallet.Connectors.find(function (_ref16) {
              var _ref17 = _slicedToArray(_ref16, 2),
                conn = _ref17[0],
                hooks = _ref17[1];
              return cname === (0, _pmWallet.getConnName)(conn);
            });
            if (!c) {
              _context10.next = 9;
              break;
            }
            _c2 = _slicedToArray(c, 1), connector = _c2[0];
            _context10.next = 7;
            return connector.connectEagerly();
          case 7:
            web3client.__cache = {};
            isAuthorized = true;
          case 9:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    })))), __actionize('setChain', /*#__PURE__*/function () {
      var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(chainid) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              chainid = (0, _utils.toHex)(chainid);
              _context11.prev = 1;
              if (chainid in _chains["default"]) {
                _context11.next = 4;
                break;
              }
              throw new Error("Chain ID \"".concat(chainid, "\" is not supported!"));
            case 4:
              _context11.next = 6;
              return ethprovider.request({
                method: 'wallet_switchEthereumChain',
                params: [{
                  chainId: chainid
                }]
              });
            case 6:
              _context11.next = 16;
              break;
            case 8:
              _context11.prev = 8;
              _context11.t0 = _context11["catch"](1);
              if (!(_context11.t0.code === 4902)) {
                _context11.next = 15;
                break;
              }
              _context11.next = 13;
              return ethprovider.request({
                method: 'wallet_addEthereumChain',
                params: [_chains["default"][chainid]]
              });
            case 13:
              _context11.next = 16;
              break;
            case 15:
              throw _context11.t0;
            case 16:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[1, 8]]);
      }));
      return function (_x5) {
        return _ref18.apply(this, arguments);
      };
    }()));
  }, [__actionize, _chains["default"], ethprovider, web3React, window.ethereum]);
  (0, _react.useEffect)(function () {
    if (!isAuthorized) return setReady(false);
    if (!web3React.isActive) return setReady(false);
    if ((0, _utils.toHex)(web3React.chainId) in _chains["default"]) {
      action.current = null;
      setReady(true);
    } else {
      setReady(false);
      if (autoSelectChain) {
        actions.current.setChain((0, _utils.toHex)(_constants.NETWORK));
      }
    }
  }, [web3React.chainId, isAuthorized]);
  (0, _react.useEffect)(function () {
    WEB3_PROVIDER = web3React.provider || _defaultWeb3Provider.DEFAULT_WEB3_PROVIDER;
  }, [web3React.provider]);
  (0, _react.useEffect)(function () {
    if (web3React.account && web3React.provider) {
      SIGNER = web3React.provider.getSigner();
      if ((0, _lodash.isFunction)(authSigner)) authSigner(SIGNER);
    }
  }, [web3React.account, web3React.provider]);
  return {
    action: action.current,
    actions: actions.current,
    ready: ready,
    connectors: _pmWallet.Connectors.map(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
        conn = _ref20[0],
        hooks = _ref20[1];
      return (0, _pmWallet.getConnName)(conn);
    }),
    chain: web3React.chainId && _chains["default"][(0, _utils.toHex)(web3React.chainId)],
    account: web3React.account,
    web3React: web3React
  };
};
//# sourceMappingURL=hooks.js.map