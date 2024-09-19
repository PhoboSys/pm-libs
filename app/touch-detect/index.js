"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTouchClass = void 0;
var detectTouch = function detectTouch() {
  return window && ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
};
var addTouchClass = exports.addTouchClass = function addTouchClass() {
  var cssclass = detectTouch() ? 'touch' : 'notouch';
  document.documentElement.classList.add(cssclass);
};
//# sourceMappingURL=index.js.map