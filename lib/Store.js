import EventEmitter from 'events'

class Store extends EventEmitter {

  constructor(...dispatchers) {
    super();

    const listeners = (this.constructor.getDispatcherListeners || this.getDispatcherListeners).call(this) || [];

    for (let dispatcher of dispatchers) {

      const map = {};
      for (let l of listeners) {
        if (dispatcher === l[0])
          map[l[1]] = l[2];
      }

      this.dispatcherToken = dispatcher.register(payload => {
        if (this.onAction) this.onAction.call(this, payload.event, ...payload.args);
        if (map[payload.event])
          if (typeof map[payload.event] === 'function')
            map[payload.event].call(this, ...payload.args);
          else this[map[payload.event]].call(this, ...payload.args);
      });
    }

    this.dispatcher = dispatchers;
  }

  emit(...args) {
    setTimeout(() => super.emit(...args), 0);
    console.log(this.constructor.name, args[0]);
  }

  getDispatcherListeners() {
    return [];
  }

  getDispatchers() {
    return this.dispatchers;
  }

  getDispatchToken() {
    return this.dispatcherToken;
  }
}

Store.construct = function (a, e) {
  const m = new a();
  m.Events = e;
  return m;
};

export default Store