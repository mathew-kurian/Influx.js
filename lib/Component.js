import {Component as _Component} from 'react'

class Component extends _Component {

  getListeners() {
    return [];
  }

  startListening() {
    var f, l = [], self = this;
    const listeners = this._ilisteners = ((this.constructor.getListeners || this.getListeners).call(this) || []).splice(0);
    for (let g of listeners) {
      if (g[0].on) {
        g[0].on(g[1], f = function () {
          if (typeof g[2] === 'function')
            g[2].call(self, ...arguments);
          else self[g[2]].call(self, ...arguments);
        });
      } else {
        f = g[0].register(payload => {
          if (payload.event === g[1]) {
            if (typeof g[2] === 'function')
              g[2].call(self, ...payload.args);
            else self[g[2]].call(self, ...payload.args);
          }
        });
      }

      l.push(f);
    }
    this._listeners = l;
  }

  stopListening() {
    var i = 0;
    const listeners = this._ilisteners;
    for (let g of listeners) {
      if (g[0].off) g[0].off(g[1], this._listeners[i++]);
      else if (g[0].unregister) g[0].unregister(this._listeners[i++]);
      else if (g[0].removeListener) g[0].removeListener(g[1], this._listeners[i++]);
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

  componentWillUnmount() {
    this.stopListening();
  }
}

export default Component