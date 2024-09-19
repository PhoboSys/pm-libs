"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.rejected = exports.fails = void 0;
var rejected = exports.rejected = function rejected(name) {
  return "".concat(name, "_REJECTED");
};
var fails = exports.fails = function fails(name) {
  return "".concat(name, "_FAILS");
};
var success = exports.success = function success(name) {
  return "".concat(name, "_SUCCESS");
};
//# sourceMappingURL=convention.js.map