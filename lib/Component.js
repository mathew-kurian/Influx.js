import {Component as _Component} from "react";

class Component extends _Component {

  constructor(...args) {
    super(...args);

    this._influxBindings = [];
  }

  getListeners() {
    return [];
  }

  startListening() {
    const defs = ((this.constructor.getListeners || this.getListeners).call(this) || []).splice(0);
    const bindings = [];

    for (let def of defs) {
      const emitter = def[0];
      const event = def[1];
      const listener = def[2];

      if (typeof emitter.on === 'function') {
        const handler = (...args) => {
          if (typeof listener === 'string') {
            this[listener].call(this, ...args);
          } else {
            listener.call(this, ...args);
          }
        };

        emitter.on(event, handler);
        bindings.push({emitter, event, handler});
      } else {
        throw Error('Could not bind to emitter. Does not have function emitter#on(event, listener)');
      }
    }

    this._influxBindings = bindings;
  }

  stopListening() {
    const bindings = this._influxBindings;

    for (let binding of bindings) {
      const emitter = binding.emitter;
      const event = binding.event;
      const handler = binding.handler;

      let func;
      if (typeof emitter.off === 'function') {
        func = 'off';
      } else if (typeof emitter.removeListener === 'function') {
        func = 'removeListener';
      }

      if (func) {
        emitter[func](event, handler);
      } else {
        throw Error('Could not unbind to emitter. Does not have function emitter#off(event, listener) or emitter#removeListener(event, listener)');
      }
    }
  }

  refreshListeners(cb) {
    this.stopListening();
    if (typeof cb === 'function') cb();
    this.startListening();
  }

  componentDidMount() {
    this.startListening();
  }

  componentWillUpdate() {
    this.stopListening();
  }

  componentDidUpdate() {
    this.startListening();
  }

  componentWillUnmount() {
    this.stopListening();
  }
}

export default Component