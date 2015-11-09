import EventEmitter from 'events'

class Store extends EventEmitter {

  constructor(...dispatchers) {
    super();

    if (typeof this.onAction !== 'function')
      throw new Error('Method `onAction` is not defined');

    for (let dispatcher of dispatchers) {

      const eventMap = {};
      const listeners = this.getDispatcherListeners();
      for (let l of listeners) {
        if (dispatcher === l[0])
          eventMap[l[1]] = l[2];
      }

      this.dispatcherToken = dispatcher.register(payload => {
        this.onAction(payload.event, ...payload.args);
        if (eventMap[payload.event]) this[eventMap[payload.event]](...payload.args);
      });
    }

  }

  emit(...args) {
    super.emit(...args);
    console.log(this.constructor.name, args[0]);
  }

  getListeners() {
    return [];
  }

  getDispatcher() {
    return this.dispatcher;
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