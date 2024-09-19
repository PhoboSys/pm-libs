"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addConnectionListener = addConnectionListener;
var _logger = _interopRequireDefault(require("../logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var isOnLine = function isOnLine() {
  return window && window.navigator && window.navigator.onLine;
};
function addConnectionListener(listener) {
  if (typeof listener !== 'function') return;
  var handler = function handler(event) {
    if (event.type === 'online') listener(isOnLine());
    if (event.type === 'offline') listener(isOnLine());
    _logger["default"].info('Connecation status get changed:', event.type);
  };
  listener(isOnLine());
  window.addEventListener('online', handler);
  window.addEventListener('offline', handler);
  return function () {
    window.removeEventListener('online', handler);
    window.removeEventListener('offline', handler);
  };
}
//# sourceMappingURL=index.js.map