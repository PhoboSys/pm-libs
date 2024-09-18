"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDesktopEnv = isDesktopEnv;
exports.isMobileEnv = isMobileEnv;
function isDesktopEnv(config) {
  return config.application_type === 'desktop';
}
function isMobileEnv(config) {
  return config.application_type === 'mobile';
}
//# sourceMappingURL=index.js.map