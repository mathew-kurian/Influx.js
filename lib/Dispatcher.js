import EventEmitter from "events";

class Dispatcher extends EventEmitter {
  constructor(...args) {
    super(...args);

    this.setMaxListeners(Number.MAX_SAFE_INTEGER);
  }

  emit(event, ...args) {
    if (!event) {
      throw new Error('You forgot to specify event.');
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(this.constructor.name, event, ...args);
    }

    super.emit(event, ...args);
  }
}

Dispatcher.construct = function (a, e) {
  const m = new a();
  m.Events = e;
  return m;
};


export default Dispatcher;
