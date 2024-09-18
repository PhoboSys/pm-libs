"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interceptorMiddleware = interceptorMiddleware;
var _lodash = require("lodash");
var _logger = _interopRequireDefault(require("../logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function interceptorMiddleware(interceptors) {
  return function (store) {
    return function (next) {
      return function (action) {
        for (var name in interceptors) {
          var interceptor = interceptors[name];
          if (!(0, _lodash.isFunction)(interceptor.detect)) continue;
          if (!(0, _lodash.isFunction)(interceptor.intercept)) continue;
          var detected = interceptor.detect(action, store);
          if (!detected) continue;
          _logger["default"].info('Action "%s" was detected by "%s", intercepting!', action.type, name);
          interceptor.intercept(action, store);
        }
        if (!action.metadata.stopPropagation) return next(action);
      };
    };
  };
}
//# sourceMappingURL=index.js.map