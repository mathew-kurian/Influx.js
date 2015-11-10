'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = (function (_Component2) {
  _inherits(Component, _Component2);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: 'getListeners',
    value: function getListeners() {
      return [];
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var f,
          l = [],
          self = this;
      var listeners = this._ilisteners = ((this.getListeners || this.constructor.getListeners).call(this) || []).splice(0);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var g = _step.value;

          if (g[0].on) {
            g[0].on(g[1], f = function () {
              var _g$;

              if (typeof g[2] === 'function') (_g$ = g[2]).call.apply(_g$, [self].concat(Array.prototype.slice.call(arguments)));else self[g[2]].apply(self, arguments);
            });
          } else {
            f = g[0].register(function (payload) {
              if (payload.event === g[1]) {
                if (typeof g[2] === 'function') g[2].apply(g, _toConsumableArray(payload.args));else self[g[2]].apply(self, _toConsumableArray(payload.args));
              }
            });
          }

          l.push(f);
        };

        for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

      this._listeners = l;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var i = 0;
      var listeners = this._ilisteners;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var g = _step2.value;

          if (g[0].off) g[0].off(g[1], this._listeners[i++]);else g[0].unregister(this._listeners[i++]);
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
  }]);

  return Component;
})(_react.Component);

exports.default = Component;
