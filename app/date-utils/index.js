"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDays = addDays;
exports.daysBetween = daysBetween;
exports.difInSecondsUnixTS = difInSecondsUnixTS;
exports.duration = duration;
exports.durationToSeconds = durationToSeconds;
exports.durationUnixTS = durationUnixTS;
exports.formatDate = formatDate;
exports.formatDistance = formatDistance;
exports.formatDistanceUnixTS = formatDistanceUnixTS;
exports.formatDuration = formatDuration;
exports.formatUnixTS = formatUnixTS;
exports.formatted = formatted;
exports.formattedUnixTS = formattedUnixTS;
exports.getDateOfExpire = getDateOfExpire;
exports.init = init;
exports.nowTS = nowTS;
exports.nowUnixTS = nowUnixTS;
exports.setLocaleDateFns = setLocaleDateFns;
exports.timeSinceUnixTS = timeSinceUnixTS;
exports.toDate = toDate;
exports.toLocalStringUnixTS = toLocalStringUnixTS;
exports.toUnixTS = toUnixTS;
var _dateFns = require("date-fns");
var _locale = require("date-fns/locale");
var _lodash = require("lodash");
var _timeCorrection = require("../time-correction");
var _config = _interopRequireDefault(require("../../config"));
var _constants = require("../../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var LOCALES = {
  'en': _locale.enUS,
  'en-US': _locale.enUS,
  'es': _locale.es
};
var locale = LOCALES[_config["default"].default_locale];
function setLocaleDateFns(newlocale) {
  if (newlocale !== locale.code && newlocale in LOCALES) {
    locale = LOCALES[newlocale];
  }
}
function nowTS() {
  return Date.now() + (window.time_correction || 0);
}
function toUnixTS(timestamp) {
  return parseInt(timestamp / 1000);
}
function nowUnixTS() {
  return toUnixTS(nowTS());
}
function formatDuration(duration) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['days', 'hours', 'minutes', 'seconds'];
  var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ':';
  if ((0, _lodash.isEmpty)(duration) || !(0, _lodash.isPlainObject)(duration)) return '';
  var time = (0, _lodash.values)((0, _lodash.pick)(duration, keys));
  var pritty = [];
  var _iterator = _createForOfIteratorHelper(time),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var part = _step.value;
      if (pritty.length) pritty.push(part.toFixed().padStart(2, '0'));else if (part) pritty.push(part);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return pritty.join(delimiter) || '0';
}
function durationToSeconds(duration) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['days', 'hours', 'minutes', 'seconds'];
  if ((0, _lodash.isEmpty)(duration) || !(0, _lodash.isPlainObject)(duration)) return '';
  duration = (0, _lodash.pick)(duration, keys);
  var seconds = 0;
  for (var name in duration) {
    seconds += duration[name] * (_constants.SECONDS_IN[name] || 0);
  }
  return seconds;
}
function difInSecondsUnixTS(dateLeft) {
  var dateRight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : toUnixTS(nowTS());
  dateLeft = dateLeft * 1000;
  dateRight = dateRight * 1000;
  return (0, _dateFns.differenceInSeconds)(dateLeft, dateRight);
}
function durationUnixTS(datefrom) {
  var dateto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : toUnixTS(nowTS());
  datefrom = datefrom * 1000;
  dateto = dateto * 1000;
  return duration(datefrom, dateto);
}
function duration(datefrom) {
  var dateto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nowTS();
  var start = toDate(datefrom);
  var end = toDate(dateto);
  if ((0, _lodash.isEqual)(start, _constants.INVALID_DATE) || (0, _lodash.isEqual)(end, _constants.INVALID_DATE)) {
    return {};
  }
  return (0, _dateFns.intervalToDuration)({
    start: start,
    end: end
  });
}
function toLocalStringUnixTS(unixTS) {
  if (!unixTS) return null;
  return new Date(unixTS * 1000).toLocaleString();
}
function formatUnixTS(unixTS, pattern) {
  if (!unixTS) return null;
  return (0, _dateFns.format)(unixTS * 1000, pattern);
}
function formattedUnixTS(unixTS) {
  if (!unixTS) return null;
  return formatted(unixTS * 1000);
}

// Returns timestamp with year if year is older then current
function formatted(date) {
  return formatDate(date, function (d) {
    return d.getFullYear() === new Date(nowTS()).getFullYear() ? 'MMM dd, p' : 'MMM dd yyyy, p';
  });
}
function formatDate(date, formatPattern) {
  // parameters validaton
  var isStringPatternInvalid = (0, _lodash.isEmpty)(formatPattern) || !(0, _lodash.isString)(formatPattern);
  var isFunctionPatternInvalid = !(0, _lodash.isFunction)(formatPattern);
  var isPatternInvalid = isStringPatternInvalid && isFunctionPatternInvalid;
  if (isPatternInvalid) return null;
  var datetime = toDate(date);
  if (datetime === _constants.INVALID_DATE) return null;
  if ((0, _lodash.isFunction)(formatPattern)) formatPattern = formatPattern(datetime);
  return (0, _dateFns.format)(datetime, formatPattern, {
    locale: locale
  });
}
function formatDistanceUnixTS(datefrom) {
  var dateto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : toUnixTS(nowTS());
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  datefrom = datefrom * 1000;
  dateto = dateto * 1000;
  var distance = formatDistance(datefrom, dateto, options);
  if (options !== null && options !== void 0 && options["short"]) {
    var _distance;
    var _distance$split = (_distance = distance) === null || _distance === void 0 ? void 0 : _distance.split(' '),
      _distance$split2 = _slicedToArray(_distance$split, 2),
      value = _distance$split2[0],
      units = _distance$split2[1];
    distance = [value, (0, _lodash.head)(units)].join(' ');
  }
  return distance;
}
function timeSinceUnixTS(datefrom) {
  var dateto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nowUnixTS();
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    addSuffix: true
  };
  return formatDistanceUnixTS(datefrom, dateto, options);
}
function formatDistance(datefrom) {
  var dateto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : nowTS();
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  datefrom = toDate(datefrom);
  dateto = toDate(dateto);
  if ((0, _lodash.isEqual)(datefrom, _constants.INVALID_DATE) || (0, _lodash.isEqual)(dateto, _constants.INVALID_DATE)) {
    return '';
  }
  return (0, _dateFns.formatDistanceStrict)(datefrom, dateto, _objectSpread(_objectSpread({}, options), {}, {
    locale: locale
  }));
}
function toDate(date) {
  // parameters validaton
  if (!(0, _lodash.isDate)(date) && !(0, _lodash.isString)(date) && !(0, _lodash.isNumber)(date)) return _constants.INVALID_DATE;
  var datetime = new Date(date);
  // validate datetime
  if (isNaN(datetime.getTime())) return _constants.INVALID_DATE;
  return datetime;
}
function addDays(date, days) {
  // parameters validaton
  if (days < 0 || !(0, _lodash.isInteger)(days)) return date;
  var datetime = toDate(date);
  return new Date(datetime.getTime() + _constants.MILLISECONDS_IN_DAY * days);
}
function daysBetween(date1, date2) {
  var datetime1 = toDate(date1);
  var datetime2 = toDate(date2);
  var timeDiff = datetime2.getTime() - datetime1.getTime();
  return Math.max(Math.floor(timeDiff / _constants.MILLISECONDS_IN_DAY), 0) || 0;
}
function getDateOfExpire(date) {
  var expireDays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
  var datetime = addDays(date, expireDays);
  return formatDate(datetime, 'MMMM d, yyyy');
}
function init() {
  _timeCorrection.TimeCorrection.init(function (correction) {
    return window.time_correction = correction;
  });
}
//# sourceMappingURL=index.js.map