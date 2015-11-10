'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = require('./lib/Component');

var _Component2 = _interopRequireDefault(_Component);

var _Dispatcher = require('./lib/Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _Store = require('./lib/Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Influx = { Component: _Component2.default, Dispatcher: _Dispatcher2.default, Store: _Store2.default };

exports.default = Influx;
