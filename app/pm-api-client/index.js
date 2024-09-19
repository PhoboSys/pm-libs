"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PriceFeedApi: true,
  UserApi: true,
  ChatApi: true
};
exports.UserApi = exports.PriceFeedApi = exports.ChatApi = void 0;
var _ApiClient = require("./ApiClient");
Object.keys(_ApiClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ApiClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ApiClient[key];
    }
  });
});
var _PriceFeedApi2 = require("./PriceFeedApi");
var _ChatApi2 = require("./ChatApi");
var _UserApi2 = require("./UserApi");
var PriceFeedApi = exports.PriceFeedApi = new _PriceFeedApi2.PriceFeedApi();
var UserApi = exports.UserApi = new _UserApi2.UserApi();
var ChatApi = exports.ChatApi = new _ChatApi2.ChatApi();
//# sourceMappingURL=index.js.map