"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _default() {
  if (typeof window.ResizeObserver !== 'function') {
    window.ResizeObserver = _resizeObserverPolyfill["default"];
  }
}
//# sourceMappingURL=index.js.map