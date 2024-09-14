"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_CHAIN_IDS = exports.SCANNER_URLS = exports.ROPSTEN = exports.RINKEBY = exports.POLYGON_MUMBAI = exports.POLYGON = exports.OPTIMISM_GOERLI = exports.OPTIMISM = exports.NETWORK_URLS = exports.NETWORK = exports.MAINNET = exports.LDE_URL = exports.LDE = exports.KOVAN = exports.GOERLI = exports.CELO_ALFAJORES = exports.CELO = exports.BINANCE_TEST = exports.BINANCE = exports.ARBITRUM_RINKEBY = exports.ARBITRUM_ONE = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MAINNET = exports.MAINNET = 1;
var ROPSTEN = exports.ROPSTEN = 3;
var RINKEBY = exports.RINKEBY = 4;
var GOERLI = exports.GOERLI = 5;
var KOVAN = exports.KOVAN = 42;
var ARBITRUM_ONE = exports.ARBITRUM_ONE = 42161;
var ARBITRUM_RINKEBY = exports.ARBITRUM_RINKEBY = 421611;
var OPTIMISM = exports.OPTIMISM = 10;
var OPTIMISM_GOERLI = exports.OPTIMISM_GOERLI = 420;
var BINANCE = exports.BINANCE = 56;
var BINANCE_TEST = exports.BINANCE_TEST = 97;
var POLYGON = exports.POLYGON = 137;
var POLYGON_MUMBAI = exports.POLYGON_MUMBAI = 80001;
var CELO = exports.CELO = 42220;
var CELO_ALFAJORES = exports.CELO_ALFAJORES = 44787;
var LDE = exports.LDE = process.env.WEB3_LDE_CHAIN_ID;
var LDE_URL = exports.LDE_URL = process.env.WEB3_LDE_CHAIN_URL;
var NETWORK = exports.NETWORK = LDE || POLYGON;
var NETWORK_URLS = exports.NETWORK_URLS = {
  READ: _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, POLYGON, ['https://polygon-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf',
  // ??
  'https://polygon.drpc.org',
  // ??
  'https://1rpc.io/matic',
  // ??
  'https://polygon-mainnet.public.blastapi.io',
  // ??
  'https://endpoints.omniatech.io/v1/matic/mainnet/public',
  // ??
  'https://gateway.tenderly.co/public/polygon',
  // ??

  'https://rpc.ankr.com/polygon',
  // ~90% success
  'https://polygon.blockpi.network/v1/rpc/public',
  // ~99% success
  'https://polygon.api.onfinality.io/public',
  // ~99% success
  'https://polygon.gateway.tenderly.co',
  // ~95% success
  'https://polygon.rpc.subquery.network/public',
  // ~99% success
  'https://rpc-mainnet.matic.quiknode.pro' // ~99% success
  //
  // 'https://polygon-mainnet.4everland.org/v1/37fa9972c1b1cd5fab542c7bdd4cde2f', // ~80%
  // 'https://polygon.rpc.blxrbdn.com',             // ~60% success
  // 'https://polygon-bor-rpc.publicnode.com        // ~60% success
  // 'https://polygon-pokt.nodies.app',             // ~65% success
  // 'https://polygon.llamarpc.com',                // ~60% success
  // 'https://polygon.meowrpc.com',                 // ~60% success
  // 'https://api.zan.top/node/v1/polygon/mainnet/public',                        // 0%
  ]), POLYGON_MUMBAI, ['https://rpc-mumbai.matic.today']), MAINNET, ['https://eth.public-rpc.com']), LDE, [LDE_URL]),
  WRITE: _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, POLYGON, ['https://polygon-rpc.com' // ~97% success
  ]), POLYGON_MUMBAI, ['https://rpc-mumbai.matic.today']), MAINNET, ['https://eth.public-rpc.com']), LDE, [LDE_URL])
};
var SCANNER_URLS = exports.SCANNER_URLS = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, POLYGON, 'https://polygonscan.com'), POLYGON_MUMBAI, 'https://mumbai.polygonscan.com'), MAINNET, 'https://etherscan.io'), LDE, LDE_URL);
var SUPPORTED_CHAIN_IDS = exports.SUPPORTED_CHAIN_IDS = [MAINNET, ROPSTEN, RINKEBY, GOERLI, KOVAN, ARBITRUM_ONE, ARBITRUM_RINKEBY, OPTIMISM, OPTIMISM_GOERLI, BINANCE, BINANCE_TEST, POLYGON, POLYGON_MUMBAI, CELO, CELO_ALFAJORES];
//# sourceMappingURL=constants.js.map