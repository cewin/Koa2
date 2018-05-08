'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _util.promisify)(_fs.readFile)((0, _path.resolve)(__dirname, '../package.json'));

          case 2:
            data = _context.sent;


            data = JSON.parse(data);

            console.log('async:', data.name);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

var _util = require('util');

var _path = require('path');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _util.promisify)(_fs.readFile)((0, _path.resolve)(__dirname, '../package.json')).then(function (data) {
  data = JSON.parse(data);

  console.log(data.name);

  (0, _fs.writeFileSync)((0, _path.resolve)(__dirname, './name'), String(data.name), 'utf-8');
});

init();
//# sourceMappingURL=index.js.map