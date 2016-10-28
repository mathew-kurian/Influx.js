'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_Component2) {
  _inherits(Component, _Component2);

  function Component() {
    var _ref;

    _classCallCheck(this, Component);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Component.__proto__ || Object.getPrototypeOf(Component)).call.apply(_ref, [this].concat(args)));

    _this._influxBindings = [];
    return _this;
  }

  _createClass(Component, [{
    key: 'getListeners',
    value: function getListeners() {
      return [];
    }
  }, {
    key: 'startListening',
    value: function startListening() {
      var _this2 = this;

      var defs = ((this.constructor.getListeners || this.getListeners).call(this) || []).splice(0);
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
              for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
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
    key: 'stopListening',
    value: function stopListening() {
      var bindings = this._influxBindings;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = bindings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var binding = _step2.value;

          var _emitter = binding.emitter;
          var _event = binding.event;
          var handler = binding.handler;

          var func = void 0;
          if (typeof _emitter.off === 'function') {
            func = 'off';
          } else if (typeof _emitter.removeListener === 'function') {
            func = 'removeListener';
          }

          if (func) {
            _emitter[func](_event, handler);
          } else {
            throw Error('Could not unbind to emitter. Does not have function emitter#off(event, listener) or emitter#removeListener(event, listener)');
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'refreshListeners',
    value: function refreshListeners(cb) {
      this.stopListening();
      if (typeof cb === 'function') cb();
      this.startListening();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startListening();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.stopListening();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.startListening();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopListening();
    }
  }]);

  return Component;
}(_react.Component);

exports.default = Component;
