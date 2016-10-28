import EventEmitter from "events";

class Store extends EventEmitter {

  constructor() {
    super();

    this.setMaxListeners(Number.MAX_SAFE_INTEGER);
    this.startListening();
  }

  startListening() {
    const func = this.getDispatcherListeners || this.getListeners;
    const defs = (func ? func.call(this) : []).splice(0);
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

  emit(...args) {
    setTimeout(() => super.emit(...args), 0);
  }
}

Store.construct = function (a, e) {
  const m = new a();
  m.Events = e;
  return m;
};

export default Store