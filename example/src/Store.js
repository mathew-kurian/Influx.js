import Influx from '../../index.js'
import keyMirror from 'keyMirror'
import Dispatcher from './Dispatcher'

const Events = keyMirror({
  UPDATED: null
});

class Store extends Influx.Store {
  constructor(...args) {
    super(Dispatcher/*,  additional dispatchers you have */);
    this.data = {count: 0};
    this.className = this.constructor.name;
  }

  getCount() {
    return this.data.count;
  }

  getDispatcherListeners() {
    return [
      [Dispatcher, Dispatcher.Events.INCREMENT, '_onDispatcherIncrement'],
      [Dispatcher, Dispatcher.Events.ALERT, this._onDispatcherAlert]
    ]
  }

  _onDispatcherIncrement() {
    this.data.count++;
    this.emit(Events.UPDATED, this.data.count);
  }

  _onDispatcherAlert(message) {
    console.log(message);
  }

  onAction(event, arg0) {
    switch (event) {
      case Dispatcher.Events.INCREMENT:
      case Dispatcher.Events.ALERT:
      default:
        console.info(this.className, "onAction", event, arg0);
    }
  }
}

export default Store.construct(Store, Events)