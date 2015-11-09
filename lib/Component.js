import {Component as _Component} from 'react'

class Component extends _Component {

  getStoreListeners() {
    return [];
  }

  componentWillMount() {
    var f, l = [], self = this;
    const listeners = this._ilisteners = ((this.constructor.getListeners || this.getListeners)() || []).splice(0);
    for (let g of listeners) {
      if (g[0].on) {
        g[0].on(g[1], f = function () {
          self[g[2]].apply(self, arguments)
        });
      } else {
        f = g[0].register(payload => {
          if (payload.event === g[1]) {
            self[g[2]](...payload.args);
          }
        });
      }

      l.push(f);
    }
    this._listeners = l;
  }

  componentWillUnmount() {
    var i = 0;
    const listeners = this._ilisteners;
    for (let g of listeners) {
      if (g[0].off) g[0].off(g[1], this._listeners[i++]);
      else  g[0].unregister(this._listeners[i++]);
    }
  }
}

export default Component