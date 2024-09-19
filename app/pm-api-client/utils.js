"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renameQuery = void 0;
var renameQuery = exports.renameQuery = function renameQuery(query, name) {
  var regexPattern = /(query\s+).*?([\{\(])/;
  return query.replace(regexPattern, '$1' + name + ' $2');
};
//# sourceMappingURL=utils.js.map