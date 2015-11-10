'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Store = (function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  function Store() {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this));

    var listeners = (_this.constructor.getDispatcherListeners || _this.getDispatcherListeners).call(_this) || [];

    for (var _len = arguments.length, dispatchers = Array(_len), _key = 0; _key < _len; _key++) {
      dispatchers[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = dispatchers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var dispatcher = _step.value;

        var map = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var l = _step2.value;

            if (dispatcher === l[0]) map[l[1]] = l[2];
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

        _this.dispatcherToken = dispatcher.register(function (payload) {
          if (_this.onAction) _this.onAction.apply(_this, [payload.event].concat(_toConsumableArray(payload.args)));
          if (map[payload.event]) if (typeof map[payload.event] === 'function') map[payload.event].apply(map, _toConsumableArray(payload.args));else _this[map[payload.event]].apply(_this, _toConsumableArray(payload.args));
        });
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

    return _this;
  }

  _createClass(Store, [{
    key: 'emit',
    value: function emit() {
      var _get2;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = _get(Object.getPrototypeOf(Store.prototype), 'emit', this)).call.apply(_get2, [this].concat(args));
      console.log(this.constructor.name, args[0]);
    }
  }, {
    key: 'getDispatcherListeners',
    value: function getDispatcherListeners() {
      return [];
    }
  }, {
    key: 'getDispatcher',
    value: function getDispatcher() {
      return this.dispatcher;
    }
  }, {
    key: 'getDispatchToken',
    value: function getDispatchToken() {
      return this.dispatcherToken;
    }
  }]);

  return Store;
})(_events2.default);

Store.construct = function (a, e) {
  var m = new a();
  m.Events = e;
  return m;
};

exports.default = Store;
