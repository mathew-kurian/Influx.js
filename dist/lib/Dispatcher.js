'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dispatcher = function (_EventEmitter) {
  _inherits(Dispatcher, _EventEmitter);

  function Dispatcher() {
    var _ref;

    _classCallCheck(this, Dispatcher);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Dispatcher.__proto__ || Object.getPrototypeOf(Dispatcher)).call.apply(_ref, [this].concat(args)));

    _this.setMaxListeners(Number.MAX_SAFE_INTEGER);
    return _this;
  }

  _createClass(Dispatcher, [{
    key: 'emit',
    value: function emit(event) {
      var _get2;

      if (!event) {
        throw new Error('You forgot to specify event.');
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (process.env.NODE_ENV !== 'production') {
        var _console;

        (_console = console).log.apply(_console, [this.constructor.name, event].concat(args));
      }

      (_get2 = _get(Dispatcher.prototype.__proto__ || Object.getPrototypeOf(Dispatcher.prototype), 'emit', this)).call.apply(_get2, [this, event].concat(args));
    }
  }]);

  return Dispatcher;
}(_events2.default);

Dispatcher.construct = function (a, e) {
  var m = new a();
  m.Events = e;
  return m;
};

exports.default = Dispatcher;
