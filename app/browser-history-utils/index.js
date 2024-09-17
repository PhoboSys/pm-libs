"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initForceRefreshBetweenAppsNavigation = initForceRefreshBetweenAppsNavigation;
var _envUtils = require("../env-utils");
function initForceRefreshBetweenAppsNavigation(config) {
  if (!(0, _envUtils.isMobileEnv)(config)) return;
  function forceRefresh() {
    var _window$location, _window$location2, _window$location3;
    var baseUrl = "/".concat((_window$location = window.location) === null || _window$location === void 0 || (_window$location = _window$location.pathname) === null || _window$location === void 0 || (_window$location = _window$location.split('/')) === null || _window$location === void 0 ? void 0 : _window$location[1]);
    if (![config.pm_base_path, config.st_base_path, config.mt_base_path].includes(baseUrl)) return;
    if (baseUrl === config.pm_base_path) return;
    ((_window$location2 = window.location) === null || _window$location2 === void 0 ? void 0 : _window$location2.reload) && ((_window$location3 = window.location) === null || _window$location3 === void 0 ? void 0 : _window$location3.reload());
  }
  window.addEventListener('popstate', forceRefresh);
  return function () {
    window.removeEventListener('popstate', forceRefresh);
  };
}
//# sourceMappingURL=index.js.map