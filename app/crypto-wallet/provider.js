"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletProvider = void 0;
var _react = _interopRequireDefault(require("react"));
var _ethers = require("ethers");
var _pmWallet = require("@oracly/pm-wallet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var WalletProvider = exports.WalletProvider = function WalletProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_pmWallet.Web3ReactProvider, {
    getLibrary: function getLibrary(p) {
      return new _ethers.BrowserProvider(p);
    },
    connectors: _pmWallet.Connectors
  }, children);
};
//# sourceMappingURL=provider.js.map