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

var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store() {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

    _this.setMaxListeners(Number.MAX_SAFE_INTEGER);
    _this.startListening();
    return _this;
  }

  _createClass(Store, [{
    key: 'startListening',
    value: function startListening() {
      var _this2 = this;

      var func = this.getDispatcherListeners || this.getListeners;
      var defs = (func ? func.call(this) : []).splice(0);
      var bindings = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var def = _step.value;

          var emitter = def[0];
          var event = def[1];
          var listener = def[2];

          if (typeof emitter.on === 'function') {
            var handler = function handler() {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              if (typeof listener === 'string') {
                var _listener;

                (_listener = _this2[listener]).call.apply(_listener, [_this2].concat(args));
              } else {
                listener.call.apply(listener, [_this2].concat(args));
              }
            };

            emitter.on(event, handler);
            bindings.push({ emitter: emitter, event: event, handler: handler });
          } else {
            throw Error('Could not bind to emitter. Does not have function emitter#on(event, listener)');
          }
        };

        for (var _iterator = defs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._influxBindings = bindings;
    }
  }, {
    key: 'emit',
    value: function emit() {
      var _this3 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      setTimeout(function () {
        var _get2;

        return (_get2 = _get(Store.prototype.__proto__ || Object.getPrototypeOf(Store.prototype), 'emit', _this3)).call.apply(_get2, [_this3].concat(args));
      }, 0);
    }
  }]);

  return Store;
}(_events2.default);

Store.construct = function (a, e) {
  var m = new a();
  m.Events = e;
  return m;
};

exports.default = Store;
