"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toHex = void 0;
var toHex = exports.toHex = function toHex(num) {
  var val = Number(num);
  return val ? '0x' + val.toString(16) : num;
};
//# sourceMappingURL=utils.js.map