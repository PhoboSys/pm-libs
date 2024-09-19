"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.del = del;
exports.get = get;
exports.set = set;
var _dotPropImmutable = _interopRequireDefault(require("dot-prop-immutable"));
var _lodash = require("lodash");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function get(obj, path) {
  if (!(0, _lodash.isObject)(obj)) obj = {};
  return _dotPropImmutable["default"].get(obj, path);
}
function set(obj, path, value) {
  if (!(0, _lodash.isObject)(obj)) obj = {};
  return _dotPropImmutable["default"].set(obj, path, value);
}
function del(obj, path) {
  if (!(0, _lodash.isObject)(obj)) obj = {};
  return _dotPropImmutable["default"]["delete"](obj, path);
}
var _default = exports["default"] = {
  get: get,
  set: set,
  del: del
};
//# sourceMappingURL=index.js.map