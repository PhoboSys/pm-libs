"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "COMMAND", {
  enumerable: true,
  get: function get() {
    return _dispatchType.COMMAND;
  }
});
Object.defineProperty(exports, "FAILED", {
  enumerable: true,
  get: function get() {
    return _actionStatus.FAILED;
  }
});
Object.defineProperty(exports, "QUERY", {
  enumerable: true,
  get: function get() {
    return _dispatchType.QUERY;
  }
});
Object.defineProperty(exports, "SUCCEED", {
  enumerable: true,
  get: function get() {
    return _actionStatus.SUCCEED;
  }
});
Object.defineProperty(exports, "THROTTLED", {
  enumerable: true,
  get: function get() {
    return _actionStatus.THROTTLED;
  }
});
exports.command = _command;
exports.connectDecorator = connectDecorator;
exports.cqrsDispatchMapper = cqrsDispatchMapper;
exports.cqrsMiddleware = cqrsMiddleware;
Object.defineProperty(exports, "fails", {
  enumerable: true,
  get: function get() {
    return _convention.fails;
  }
});
exports.findAction = findAction;
exports.initMetadata = initMetadata;
exports.query = _query;
Object.defineProperty(exports, "rejected", {
  enumerable: true,
  get: function get() {
    return _convention.rejected;
  }
});
Object.defineProperty(exports, "success", {
  enumerable: true,
  get: function get() {
    return _convention.success;
  }
});
var _logger = _interopRequireDefault(require("@lib/logger"));
var _lodash = require("lodash");
var _convention = require("./convention");
var _dispatchType = require("./dispatchType");
var _actionStatus = require("./actionStatus");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _inprogress = {};
function actionize(dispatchs) {
  dispatchs = (0, _lodash.filter)(dispatchs, _lodash.isFunction);
  dispatchs = (0, _lodash.filter)(dispatchs, 'actionType');
  return (0, _lodash.keyBy)(dispatchs, 'actionType');
}
function printError(msg) {
  _logger["default"].info(msg);
  console.error(msg); // eslint-disable-line
}
function serializer(key, value) {
  if (typeof value === 'bigint') value = String(value);
  if (typeof value === 'undefined') value = String(null);
  return value;
}
function cqrsMiddleware(asynchronous) {
  return function (store) {
    return function (next) {
      return function (action) {
        var dispatchType = action.metadata.dispatchType;
        var type = action.type;
        if (!dispatchType) {
          printError("".concat(type, " get ignore"));
          return next(action);
        }
        var _actionstr = JSON.stringify({
          type: type,
          args: action.args
        }, serializer);
        var _action = JSON.parse(_actionstr);
        var method = asynchronous[type];
        if (typeof method !== 'function') return next(action);
        if (_actionstr in _inprogress) {
          return store.dispatch(_objectSpread(_objectSpread({}, _action), {}, {
            type: (0, _convention.rejected)(type),
            metadata: {
              dispatchType: dispatchType,
              status: _actionStatus.THROTTLED,
              origin: action
            }
          }));
        }
        if (dispatchType === _dispatchType.QUERY) {
          _inprogress[_actionstr] = null;
        }
        var promise = method(action.args);
        next(action);
        return promise.then(function (result) {
          delete _inprogress[_actionstr];
          _action.args.result = JSON.parse(JSON.stringify(result, serializer));
          return store.dispatch(_objectSpread(_objectSpread({}, _action), {}, {
            type: (0, _convention.success)(type),
            metadata: {
              dispatchType: dispatchType,
              status: _actionStatus.SUCCEED,
              origin: action
            }
          }));
        })["catch"](function (error) {
          delete _inprogress[_actionstr];
          if ((0, _lodash.isError)(error)) {
            printError(error);
            error = error.toString();
          }
          _action.args.error = error;
          return store.dispatch(_objectSpread(_objectSpread({}, _action), {}, {
            type: (0, _convention.fails)(type),
            metadata: {
              dispatchType: dispatchType,
              status: _actionStatus.FAILED,
              origin: action
            }
          }));
        });
      };
    };
  };
}
var METADATA = null;
function initMetadata(metadata) {
  if ((0, _lodash.isEmpty)(metadata) || !(0, _lodash.isPlainObject)(metadata)) return;
  if (!(0, _lodash.isNull)(METADATA)) return;
  METADATA = structuredClone(metadata);
}
function _creator(actionName, args, metadata, dispatchType) {
  if (!(0, _lodash.isEmpty)(args) && !(0, _lodash.isPlainObject)(args)) args = {};
  if (!(0, _lodash.isEmpty)(metadata) && !(0, _lodash.isPlainObject)(metadata)) metadata = {};
  args = args || {};
  metadata = metadata || {};
  return {
    type: actionName,
    args: args,
    metadata: _objectSpread(_objectSpread(_objectSpread({}, METADATA), metadata), {}, {
      dispatchType: dispatchType
    })
  };
}
function _command(actionName, args, metadata) {
  return _creator(actionName, args, metadata, _dispatchType.COMMAND);
}
function _query(actionName, args, metadata) {
  return _creator(actionName, args, metadata, _dispatchType.QUERY);
}
function cqrsDispatchMapper(dispatchMapper) {
  if (!(0, _lodash.isFunction)(dispatchMapper)) return dispatchMapper;
  return function (dispatch, ownProps) {
    var actions = dispatchMapper({
      command: function command(actionName) {
        var result = function result(args) {
          return dispatch(_command(actionName, args));
        };
        result.actionType = actionName;
        return result;
      },
      query: function query(actionName) {
        var result = function result(args) {
          return dispatch(_query(actionName, args));
        };
        result.actionType = actionName;
        return result;
      }
    }, ownProps);
    var dispatches = actionize(actions);
    dispatches['dispatch'] = dispatch;
    return dispatches;
  };
}
function connectDecorator(reduxConnect, stateMapper, dispatchMapper, merge, options) {
  if (!(0, _lodash.isFunction)(reduxConnect)) {
    return printError('Missing reduxConnect function!');
  }
  var start = Date.now();
  var connector = reduxConnect(stateMapper, cqrsDispatchMapper(dispatchMapper), merge, options);
  var connecttook = Date.now() - start;
  if (connecttook > 10) {
    _logger["default"].warn('[Violation] Connect took ' + connecttook + 'ms');
  }
  return connector;
}
function findAction(action, type) {
  while (action && action.type !== type) {
    action = get(action, ['metadata', 'origin']);
  }
  return action;
}
//# sourceMappingURL=index.js.map