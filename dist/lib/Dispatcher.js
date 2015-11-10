'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _es6Symbol = require('es6-symbol');
var Symbol = _es6Symbol;

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _flux = require('flux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dispatcher = (function (_Dispatcher2) {
  _inherits(Dispatcher, _Dispatcher2);

  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dispatcher).apply(this, arguments));
  }

  _createClass(Dispatcher, [{
    key: 'dispatch',
    value: function dispatch(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!event) {
        throw new Error('You forgot to specify event.');
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log(this.constructor.name, event);
      }

      _get(Object.getPrototypeOf(Dispatcher.prototype), 'dispatch', this).call(this, { event: event, args: args });
    }
  }, {
    key: 'dispatchAsync',
    value: function dispatchAsync(promise, events) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var request = events.request;
      var success = events.success;
      var failure = events.failure;

      dispatch.apply(undefined, [request].concat(args));
      promise.then(function (response) {
        return dispatch(success, _extends({}, args, { response: response }));
      }, function (error) {
        return dispatch(failure, _extends({}, args, { error: error }));
      });
    }
  }, {
    key: 'emit',
    value: function emit() {
      var _this2 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      setTimeout(function () {
        return _this2.dispatch.apply(_this2, args);
      }, 0);
    }
  }]);

  return Dispatcher;
})(_flux.Dispatcher);

Dispatcher.construct = function (a, e) {
  var m = new a();
  m.Events = e;
  return m;
};

exports.default = Dispatcher;
